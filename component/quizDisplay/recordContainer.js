import QuizSet from "../../model/QuizSet.js";
import { convertDate, getQuizSetDocByID, sortRank } from "../../utils.js";

const style = `
.record-container{
    margin: auto;
    width: 550px;
    background-color: #252525;
    border-radius: 20px;
    padding: 40px;
    box-sizing: border-box;
    font-family: 'JetBrains Mono', monospace;
    color: #fff;
    font-size: 14px;
}
.quiz-name{
    font-size: 25px;
    text-align: center;
    margin-bottom: 15px;
}
.high-score{
    font-size: 30px;
    text-align: center;
    margin-bottom: 15px;
}
.record-table{
    margin: 0 0 20px;
    height: 300px;
    width: 100%;
    background-color: #333;
    padding: 0 15px;
    box-sizing: border-box;
    border-radius: 10px;
    overflow-y: auto;
}
.record-table table{
    border: none;
    table-layout: fixed;
    min-width: 100%;
    height: 20px;
    border-spacing: 0;
}
.record-table table th{
    background-color: #333;
    position: sticky;
    top: 0;
    height: 40px;
    
}
.record-table table tr th, .record-table table tr td{
    border-bottom: 1px solid #ccc;
    text-align: left;
    padding: 10px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 85px;
}
.record-table table tr:hover{
    background-color: #434343;
}
.btn-row{
    display: flex;
    justify-content: flex-end;

}
.quiz-btn{
    color: #000;
    width: fit-content;
    background-color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 10px;
    padding: 0 10px;
    margin-left: 25px;
    transition: .5s;
}
.quiz-btn:hover{
    box-shadow: 4px 4px 0 #c20440,-4px -4px 0 #1fceab;
    cursor: pointer;
    transition: .5s;
}
/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1; 
}
    
/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
@media only screen and (max-width: 768px){
    .record-container{
        width: 400px;
    }
}

@media only screen and (max-width: 400px){
    .record-container{
        width: 90vw;
        font-size: 12px;
        padding: 20px;
    }
    .quiz-name{
        font-size: 18px;
    }
}
`

class RecordContainer extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }
    async connectedCallback() {
        this.id = this.getAttribute('id');
        const quizSetDoc = await getQuizSetDocByID(this.id);
        const quizSet = await QuizSet.parseDocument(quizSetDoc)
        const highScoreList = sortRank(quizSet.highScoreList);

        this._shadowDom.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
        ${style}
        </style>
        <div class="record-container">
            <div class="quiz-name">${quizSet.title}</div>
            <div class="high-score">High Score</div>
            <div class="record-table">
                <table id='record-table'>
                    <tr>
                      <th>Player</th>
                      <th>Score</th>
                      <th>Time achieved</th>
                    </tr>
                     
                  </table>
            </div>
            <div class="btn-row">
                <div class="quiz-btn"> <i class="fa fa-repeat"></i>Replay</div>
            </div>
        </div>
        `
        for (let i = 0; i < highScoreList.length; i++) {
            var item = highScoreList[i];
            var player = item['player']
            var score = item['score']
            var timeAchieved = item['timeAchieved']
            timeAchieved = convertDate(timeAchieved)

            //var dateString = formatDate(dateOfBirth);
            var trHTML = `<tr>
                            <td>${player}</td>
                            <td>${score} /${quizSet.quizList.length}</td>
                            <td>${timeAchieved}</td> 
                        </tr>`
            let tableRef = this._shadowDom.querySelector('#record-table').getElementsByTagName('tbody')[0]
            var newRow = tableRef.insertRow(tableRef.rows.length);
            newRow.innerHTML = trHTML;
        }

        const tryBtn = this._shadowDom.querySelector('.quiz-btn');
        tryBtn.addEventListener('click', e => {
            router.navigate(`#!quiz-starter/${this.id}`);
        })
    }
}


window.customElements.define('record-container', RecordContainer)