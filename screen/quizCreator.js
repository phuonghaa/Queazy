import Account from "../model/Account.js";
import QuizSet from "../model/QuizSet.js";
import { getAccountDocByUserName, getItemFromLocalStorage } from "../utils.js";

export default class QuizCreator extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this._shadowDom.innerHTML = `
            ${style}
            <creator-header></creator-header>
            <div class='main'>
                <preview-column></preview-column>
                <quiz-input count=1></quiz-input>
            </div>
            <div class="container">
                <div class="record-container">       
                    <div class="name-input">
                        <div>Title</div> <br>
                        <textarea placeholder="Enter quizset's title"></textarea>
                    </div>
                        
                    <div class="description-input">
                        <div>Description</div><br>
                        <textarea placeholder="This quizset is about..."></textarea>
                    </div>
                    
                    <div class="btn-row">
                        <button id='confirm-btn'>Confirm</button>
                        <button id='cancel-btn'>Back</button>
                    </div>     
                </div>
            </div>
            <animation-bg></animation-bg>
        `
        const cancelButton = this._shadowDom.getElementById('cancel-btn')
        cancelButton.addEventListener('click', () => {
            const container = this._shadowDom.querySelector('.container');
            container.style.display = "none";
        })

        const confirmBtn = this._shadowDom.querySelector('#confirm-btn');
        confirmBtn.addEventListener('click', async(e) => {
            const title = this._shadowDom.querySelector('.name-input textarea').value.trim();
            const description = this._shadowDom.querySelector('.description-input textarea').value.trim();

            if (title === '') this._shadowDom.querySelector('.name-input div').style.color = '#EE1D52'
            else this._shadowDom.querySelector('.name-input div').style.color = '#69C9D0'

            if (description === '') this._shadowDom.querySelector('.description-input div').style.color = '#EE1D52'
            else this._shadowDom.querySelector('.description-input div').style.color = '#69C9D0'

            if (title !== '' && description !== '') {
                const quizSet = new QuizSet(title, description);
                const quizList = getItemFromLocalStorage('currentQuizList');
                quizList.forEach(quiz => quizSet.addQuiz(quiz));

                localStorage.removeItem('currentQuizList');
                const currentUser = getItemFromLocalStorage('currentUser');
                const accountDoc = await getAccountDocByUserName(currentUser.userName);
                const account = await Account.parseDocument(accountDoc);
                account.addQuizSet(quizSet).then(() => {
                    router.navigate('home-screen');
                });
            }
        })
    }

}

window.customElements.define('quiz-creator', QuizCreator);

const style = `
<style>
    .main{
        margin-top: 100px;
        position: fixed;
        width: 100%;
    }
    *{
        margin: 0;
        padding: 0;
    }
    button {
        font-family: 'JetBrains Mono', monospace;
    }
    .container{
        background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
        position: fixed;
        padding-top: 120px;
        top: 0;
        left: 0;
        animation-name: animatetop;
        animation-duration: 0.5s;
        display: none;
    }

    @keyframes animatetop {
        from {top:-300px; opacity:0}
        to {top:0; opacity:1}
    }

    .record-container{
        position: relative;
        margin: auto;
        width: 50%;
        background-color:#252525;
        border-radius: 20px;
        padding: 40px;
        box-sizing: border-box;
        font-family: 'JetBrains Mono', monospace;
        color: #fff;
        font-size: 20px;
    }

    .name-input, .description-input{
        display: flex;
        flex-direction: column;
        justify-content: left;
        margin-bottom: 30px;
    }
    .name-input textarea, .description-input textarea{   
        color: #fff;
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        box-sizing: border-box;
        font-size: 20px;
        background-color: transparent;
        border: 2px solid #fff;
        border-radius: 10px;
        outline: none;
        resize: none;
    }
    .description-input textarea{
        height: 300px;
        line-height: 50px;
        resize: none;
    }
    .btn-row{
        display: flex;
        justify-content: flex-end;
    }
    #confirm-btn, #cancel-btn{
        width: fit-content;
        padding: 10px;
        background-color: #fff;
        color: #000;
        border-radius: 10px;
        margin-left: 15px;
        outline: none;
    }
    #confirm-btn:hover, #cancel-btn:hover{
        box-shadow: 4px 4px 0 #69C9D0,-4px -4px 0 #EE1D52;
        cursor: pointer;
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

    @media only screen and (max-width: 425px){
        .record-container{
            width: 70%;
            font-size: 12px;
        }
        .name-input textarea, .description-input textarea{
            font-size: 12px;
        }
    }
</style>
`