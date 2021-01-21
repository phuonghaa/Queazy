import Account from '../../model/Account.js'
import { convertDate, getAccountDocByUserName, getItemFromLocalStorage, getQuizSetDocByID } from '../../utils.js'

class QuizInfoItem extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.title = this.getAttribute('title')
        this.timeCreated = this.getAttribute('time')
        this.questionNo = this.getAttribute('question-no')
        this.recordCount = this.getAttribute('record-count')
        this.description = this.getAttribute('description')
        this.id = this.getAttribute('id')

        this.timeCreated = convertDate(this.timeCreated)

        this._shadowDom.innerHTML = `
           ${style}
            <div class="quiz-info-item">
                <div class="quiz-info-left">
                    <div class="quiz-img"> <i class="fa fa-quora" aria-hidden="true"></i> </div>
                </div>
                <div class="quiz-info-right">
                    <div id="delete-btn"> <i class="fa fa-trash"></i></div>
                    <div class="quiz-name">${this.title}</div>
                    <div class="quiz-created-time">${this.timeCreated}</div>
                    <div class="quiz-summary">
                        <div class="question-no"> <i class="fa fa-book"></i> ${this.questionNo} questions</div>
                        <div class="played-times"> <i class="fa fa-play"></i> played ${this.recordCount} times</div>
                    </div>
                    <div class="quiz-description">${this.description}</div>
                    <div class="quiz-btn">
                        <div id="view-btn"> <i class="fa fa-trophy"></i> <span>View Records</span> </div>
                        <div id="play-btn"> <i class="fa fa-play"></i> <span>Play Now</span> </div>
                        <div id="share-btn"> <i class="fa fa-share-alt"></i> <span>Share</span> </div>
                    </div>
                </div>
            </div>
        `

        const deleteBtn = this._shadowDom.querySelector('#delete-btn');
        const playBtn = this._shadowDom.querySelector('#play-btn');
        const viewBtn = this._shadowDom.querySelector('#view-btn');
        const shareBtn = this._shadowDom.querySelector('#share-btn');

        const quizInfoList = this.parentElement.getRootNode().querySelector('.quiz-info-list');
        deleteBtn.addEventListener('click', async(e) => {
            quizInfoList.removeChild(this);

            const currentUser = getItemFromLocalStorage('currentUser');
            const accountDoc = await getAccountDocByUserName(currentUser.userName);
            const account = await Account.parseDocument(accountDoc);
            await account.deleteQuizSet(this.id);
        })

        playBtn.addEventListener('click', e => {
            window.open(`#!quiz-starter/${this.id}`, '_blank');
        })

        viewBtn.addEventListener('click', e => {
            router.navigate(`#!quiz-record/${this.id}`, '_blank');
        })

        shareBtn.addEventListener('click', e => {
            const url = `https://drakegocoding.github.io/Queazy/#!quiz-starter/${this.id}`;
            navigator.clipboard.writeText(url);
            const quizSetModal = this.parentElement.getRootNode().querySelector('#quizset-modal');
            quizSetModal.style.display = 'block';
        })
    }
}

window.customElements.define('quiz-info-item', QuizInfoItem)

const style = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Rowdies&display=swap" rel="stylesheet">
<style>
    .quiz-info-item{
        background-color:#252525;
        width: 55vw;
        margin: auto;
        border-radius: 10px;
        display: flex;
        margin-bottom: 5vh;
        padding: 2rem;
        z-index: 3;
        
    }
    .quiz-info-left{
        margin-right: 2rem;
        width: 20%;
        height: 12vw;
        border-radius: 10px;
        background-color: #000;
        color: #fff;
        font-size: 8vw;
        text-align: center;
        line-height: 12vw;
        text-shadow: 3px 3px 0 #c20440,-3px -3px 0 #1fceab;
    }
    .quiz-info-right{
        width: 80%;
        color: #fff;
    }
    .quiz-name{
        font-family: 'Rowdies', cursive;
        font-size: 30px;
        margin-bottom: 1vw;
    }
    .quiz-created-time, .quiz-summary, .quiz-description, .quiz-btn{
        font-family: 'JetBrains Mono', monospace;
        font-size: 16px;
    }
    .quiz-created-time, .quiz-summary{
        margin-bottom: 1.5vw;
    }
    .quiz-summary{
        display: flex;
    }
    .question-no{
        margin-right: 4vw;
    }
    .quiz-description, .quiz-btn{
        margin-bottom: 2vw;
    }
    .quiz-btn{
        display: flex;
        justify-content: flex-end;
        transition: .5s;
    }
    #delete-btn{
        float:right;
        font-size: 1.5rem;
        transition: .5s;
    }
    #share-btn, #play-btn, #view-btn{
        margin-left: 1vw;
        border: 2px solid #fff;
        padding: 0.4vw;
        border-radius: 10px;
        transition: .5s;
    }
    #share-btn:hover, #play-btn:hover, #view-btn:hover, #delete-btn:hover{
        cursor: pointer;
        background-color: #010101;
        box-shadow: 4px 4px 0 #c20440,-4px -4px 0 #1fceab;
        transition: .5s;
    }

    @media only screen and (max-width: 1023px){
        .quiz-info-item{
            width: 60vw;
            padding: 1rem 1.5rem;
        }
        .quiz-info-left{
            font-size: 14vw;
            line-height: 20vw;
            width: 30%;
            height: 20vw
        }
        .quiz-info-right{
            width: 60%;
        }
        .quiz-name{
            font-size: 18px;
        }
        .quiz-created-time, .quiz-summary, .quiz-btn{
            font-size: 10px;
        }
        .quiz-description{
            font-size: 8px;
        }
    }
    @media only screen and (max-width: 571px){
        .quiz-info-left{
            font-size: 4rem;
            padding: 0.5rem;
            margin-right: 1rem;
        }
        #delete-btn{
            font-size: 1rem;
        }
        #share-btn, #play-btn, #view-btn{
            padding: 5px 12px;
            margin-right: 1vw;
            border: 1.5px solid #fff;
        }
        .quiz-btn span{
            display: none;
        }
    }
</style>
`