import QuizSet from "../../model/QuizSet.js";
import { getQuizSetDocByID } from "../../utils.js";

const style = `
.quiz-container{
    margin: auto;
    width: 600px;
    background-color: #252525;
    border-radius: 30px;
    padding: 30px;
    box-sizing: border-box;
    font-family: 'JetBrains Mono', monospace;
    color: #fff;
    z-index: 5;
    
}
.question-no{
    font-size: 15px;
}
.quiz-content{
    border-top: 1px solid #fff;
    margin-top: 15px;
}
.question{
    margin: 15px 0 30px;
    font-size: 20px;
    height: auto;
    overflow: auto;
}
.answer-option{
    width: 100%;  
    z-index: 5;
}
.answer{
    padding: 0 20px;
    box-sizing: border-box;
    height: auto;
    margin: 10px 0;
    background-color: #333;
    border-radius: 10px;
    line-height: 40px;
    opacity: 0;
    animation: fadeIn 1s ease forwards;
    overflow: auto;
    z-index: 5;
}
@keyframes fadeIn{
    0%{
        opacity: 0,
    }
    100%{
        opacity: 1;
    }
}
.answer:hover{
    background-color: #434343;
    cursor: pointer;
}
.answer.already-answered{
    pointer-events: none;
}
.next-btn{
    margin: 50px 0 20px;
    width: 80px;
    padding: 10px;
    background-color: #fff;
    color: #000;
    border-radius: 10px;
    text-align: center;
    z-index: ;
    transition: .5s;
    
}
.next-btn:hover{
    cursor: pointer;
    box-shadow: 4px 4px 0 #c20440,-4px -4px 0 #1fceab;
    transition: .5s;
}
.status-bar{
    display: flex;
    align-items: center;
    margin: 15px 0 0;
}
.status-circle{
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 100px;
    background-color: yellowgreen;
    text-align: center;
    background-color: #333;
    line-height: 40px;
    font-size: 20px;
}
.right-ans{
    background-color: #c20440;
}
.wrong-ans{
    background-color: #1fceab;
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
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
@media only screen and (max-width: 768px){
    .quiz-container{
        width: 400px;
    }
    .answer{
        line-height: 25px;
    }
}

@media only screen and (max-width: 400px){
    .quiz-container{
        width: 90vw;
        font-size: 15px;
    }
    .question{
        font-size: 18px;
    }
}
`

class QuizContainer extends HTMLElement {
    questionCounter;
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }
    async connectedCallback() {
        this.questionCounter = 0;
        let correctCount = 0;
        this.id = this.getAttribute('id');
        this.player = this.getAttribute('player');

        const quizSetDoc = await getQuizSetDocByID(this.id);
        const quizSet = await QuizSet.parseDocument(quizSetDoc)

        let quizList = quizSet.quizList

        this._shadowDom.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
            <style>
                ${style}
            </style>
            <div class="quiz-container" id="quiz-container">
            <div class="question-no"></div>
                <div class="quiz-content">
                    <div class="question"></div>
                    <div class="answer-option">
                        <div class="answer" id="0" style="animation-delay: 0.15s"></div>
                        <div class="answer" id="1" style="animation-delay: 0.3s"></div>
                        <div class="answer" id="2" style="animation-delay: 0.45s"></div>
                        <div class="answer" id="3" style="animation-delay: 0.6s"></div>
                    </div> 
                </div>
                <div class="next-btn">Next</div>
                
            </div>
        `

        const questionNumber = this._shadowDom.querySelector('.question-no')
        const question = this._shadowDom.querySelector('.question')
        const answer = this._shadowDom.querySelectorAll('.answer')
            // console.log(answer);
        const ans1 = this._shadowDom.getElementById('0')
        const ans2 = this._shadowDom.getElementById('1')
        const ans3 = this._shadowDom.getElementById('2')
        const ans4 = this._shadowDom.getElementById('3')

        const nextBtn = this._shadowDom.querySelector('.next-btn')

        getNewQuestion(this.questionCounter++)

        //listen to the "click" event of the next-btn
        nextBtn.addEventListener('click', () => {
            if (this.questionCounter + 1 <= quizList.length) {
                getNewQuestion(this.questionCounter);
                this.questionCounter += 1;
            } else {
                quizSet.addNewRecord(this.player, correctCount)
                alert(`This is the end of the quiz. You've got ${correctCount} points!`)
                router.navigate(`#!quiz-record/${this.id}`)
            }
        })

        //print out the quiz
        function getNewQuestion(counter) {
            let quiz = quizList[counter]


            // remove the highlighted color
            for (let i = 0; i < answer.length; i++) {
                answer[i].classList.remove('already-answered');
                answer[i].style.backgroundColor = '#333';
            }

            //print out the question and answers from firebase
            questionNumber.innerHTML = `Question ${counter + 1} of ${quizList.length}`
            question.innerHTML = `${quiz.content}`
            ans1.innerHTML = `${quiz.answers[0].content}`
            ans2.innerHTML = `${quiz.answers[1].content}`
            ans3.innerHTML = `${quiz.answers[2].content}`
            ans4.innerHTML = `${quiz.answers[3].content}`

            ans1.addEventListener('click', () => {
                getResult(ans1, 0)
            })
            ans2.addEventListener('click', () => {
                getResult(ans2, 1)
            })
            ans3.addEventListener('click', () => {
                getResult(ans3, 2)
            })
            ans4.addEventListener('click', () => {
                getResult(ans4, 3)
            })

            function getResult(ans, id) {
                if (quiz.answers[id].isCorrect === true && quiz.answers[id].content === answer[id].innerHTML) {
                    ans.style.backgroundColor = '#1fceab'
                    correctCount++;
                } else {
                    ans.style.backgroundColor = '#c20440'
                        // console.log(answer[1].innerHTML);
                        //color blue the correct answer
                    for (let i = 0; i < answer.length; i++) {
                        if (quiz.answers[i].isCorrect === true && quiz.answers[i].content === answer[i].innerHTML) {
                            answer[i].style.backgroundColor = '#1fceab'
                                // console.log(quiz.answers[0]);
                        }
                    }
                }

                //make other options unclickable
                for (let i = 0; i < answer.length; i++) {
                    answer[i].classList.add('already-answered')

                }
            }

        }


    }
}

window.customElements.define('quiz-container', QuizContainer)