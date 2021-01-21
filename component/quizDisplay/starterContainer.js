import { getQuizSetDocByID } from "../../utils.js";

const style = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
    .starter-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
        width: 800px;
        height: 100vh;
        background-color:rgba(1, 1, 1, 0);
        border-radius: 20px;
        padding: 0px;
        box-sizing: border-box;
        font-family: 'JetBrains Mono', monospace;
        color: #fff;
        font-size: 14px;
    }
    .quiz-name{
        font-size: 4.5rem;
        text-align: center;
        margin-bottom: 15px;
    }
    .quiz-description{
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 30px;
        overflow: auto;
        height: 80px;
    }
    .greeting{
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 30px;
    }
    .name-input{
        padding: 0 120px;
        z-index: 5;
    }
    .name-input textarea{   
        color: #fff;
        width: 100%;
        height: 65px;
        line-height: 60px;
        text-align: center;
        padding: 0 15px;
        box-sizing: border-box;
        font-size: 25px;
        background-color: transparent;
        border: 2px solid #fff;
        border-radius: 10px;
        border-sizing: border-box;
        outline: none;
        resize: none;
    }
    .start-btn{
        color: #000;
        padding: 0 15px;
        box-sizing: border-box;
        text-align: center;
        line-height: 50px;
        width: fit-content;
        height: 50px;
        background-color: #fff;
        font-size: 18px;
        border-radius: 10px;
        margin: 30px auto 0;
        z-index: 5;
        transition: .5s;
    }
    .start-btn:hover{
        box-shadow: 4px 4px 0 #c20440,-4px -4px 0 #1fceab;
        cursor: pointer;
        height: 52px;
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
        .starter-container{
            width: 400px;
        }
        .quiz-name{
            font-size: 4rem;
        }
        .name-input{
            padding: 0;
        }
        .quiz-description{
            font-size: 1.5rem;
        }
    }
    @media only screen and (max-width: 400px){
        .starter-container{
            width: 90vw;
            font-size: 12px;
            padding: 20px;
        }
        .quiz-name{
            font-size: 3.5rem;
        }
        .quiz-description{
            font-size: 1.2rem;
        }
</style>
`

class StarterContainer extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    async connectedCallback() {
        this.id = this.getAttribute('id');
        const quizSet = await getQuizSetDocByID(this.id);
        this._shadowDom.innerHTML = `
            ${style}
            <div class="starter-container">
                <div class="quiz-name">${quizSet.title}</div>
                <div class="quiz-description">${quizSet.description}</div>
                <div class="greeting">Are you ready?</div>
                <div class="name-input">
                    <textarea placeholder="Enter your name"></textarea>
                </div>
                
                <div class="start-btn"> <i class="fa fa-play"></i> Start the Quiz</div>
            </div>
        `

        const startBtn = this._shadowDom.querySelector('.start-btn');
        const nameInput = this._shadowDom.querySelector('.name-input textarea');
        nameInput.addEventListener('keyup', e => {
            nameInput.scrollTop = nameInput.scrollHeight;
        })
        startBtn.addEventListener('click', e => {
            const name = nameInput.value.trim();
            if (name !== '') router.navigate(`#!quiz-display/${this.id}/${name}`);
        })
    }
}

window.customElements.define('starter-container', StarterContainer)