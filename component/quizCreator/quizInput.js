import { writeToLocalStorage } from "../../utils.js";

export default class QuizInput extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.questionCount = this.getAttribute('count') || '';
        this.questionContent = this.getAttribute('content') || '';
        this.answer1 = this.getAttribute('answer1') || '';
        this.answer2 = this.getAttribute('answer2') || '';
        this.answer3 = this.getAttribute('answer3') || '';
        this.answer4 = this.getAttribute('answer4') || '';
        this.check1 = this.getAttribute('check1') || '';
        this.check2 = this.getAttribute('check2') || '';
        this.check3 = this.getAttribute('check3') || '';
        this.check4 = this.getAttribute('check4') || '';
        this.previewItem = this.parentElement.querySelector('preview-column').shadowRoot
            .querySelector(`[count='${this.getAttribute('count')}']`);

        this._shadowDom.innerHTML = `
            ${style}
            <div id="question-create-box"> 
                <div id="question">
                    <textarea id="question-input" placeholder='Type your question'>${this.questionContent}</textarea>
                </div>
                <div class="answer-input">        
                    <div class="answer"> 
                        <div class='ans-decor color-red'></div> 
                        <input id='check1' type="radio" name="correct" class="correct-check" ${this.check1}> A. 
                        <textarea id='ans1' placeholder='Add Answer'>${this.answer1}</textarea>
                    </div>
                    <div class="answer"> 
                        <div class='ans-decor color-blue'></div> 
                        <input id='check2' type="radio" name="correct" class="correct-check" ${this.check2}> B. 
                        <textarea id='ans2' placeholder='Add Answer'>${this.answer2}</textarea>
                    </div>
                    <div class="answer"> 
                        <div class='ans-decor color-red'></div> 
                        <input id='check3' type="radio" name="correct" class="correct-check" ${this.check3}> C. 
                        <textarea id='ans3' placeholder='Add Answer'>${this.answer3}</textarea>
                    </div>
                    <div class="answer"> 
                        <div class='ans-decor color-blue'></div> 
                        <input id='check4' type="radio" name="correct" class="correct-check" ${this.check4}> D. 
                        <textarea id='ans4' placeholder='Add Answer'>${this.answer4}</textarea>
                    </div>
                    <div class="redirect-btns">
                        <button id='summit-btn'>Done</button>
                        <button id='cancel-btn'>Cancel</button>
                    </div>
                </div>
            </div>
        `

        const questionContent = this._shadowDom.getElementById('question-input');

        const answer1 = this._shadowDom.getElementById('ans1');
        const answer2 = this._shadowDom.getElementById('ans2');
        const answer3 = this._shadowDom.getElementById('ans3');
        const answer4 = this._shadowDom.getElementById('ans4');
        const answerList = [answer1, answer2, answer3, answer4];

        const check1 = this._shadowDom.getElementById('check1');
        const check2 = this._shadowDom.getElementById('check2');
        const check3 = this._shadowDom.getElementById('check3');
        const check4 = this._shadowDom.getElementById('check4');
        const checkList = [check1, check2, check3, check4];

        const summitBtn = this._shadowDom.getElementById('summit-btn')
        const cancelBtn = this._shadowDom.getElementById('cancel-btn')

        questionContent.addEventListener('keyup', e => {
            let content = questionContent.value.trim();
            if (content === '') this.previewItem.removeAttribute('content');
            else this.previewItem.setAttribute('content', content);
        })

        for (let i = 0; i < answerList.length; i++) {
            const answer = answerList[i];
            const check = checkList[i];
            answer.addEventListener('keyup', e => {
                let content = answer.value.trim();
                if (content === '') this.previewItem.removeAttribute(`answer${i + 1}`);
                else this.previewItem.setAttribute(`answer${i + 1}`, content);
            })
            check.addEventListener('click', e => {
                const isChecked = check.checked;
                if (isChecked) this.previewItem.setAttribute(`check${i + 1}`, 'checked');
                else this.previewItem.removeAttribute(`check${i + 1}`);
            })
        }

        const quizSetModal = this.parentElement.getRootNode().querySelector('.container');
        summitBtn.addEventListener('click', async(e) => {
            let check = true;

            const previewItemList = this.parentElement.querySelector('preview-column').shadowRoot.querySelector('.preview-item-list');
            for (const previewItem of previewItemList.children) {
                let questionCount = previewItem.shadowRoot.querySelector('.question-count');
                const isValidQuiz = previewItem.isValidPreviewItem();
                if (isValidQuiz) questionCount.style.color = '#1fceab';
                else questionCount.style.color = '#c20440';
                check = check && isValidQuiz;
            }

            if (check) {
                let quizList = [];
                for (const previewItem of previewItemList.children) {
                    const quiz = previewItem.toQuiz();
                    quizList.push(quiz);
                }
                writeToLocalStorage('currentQuizList', quizList);
                quizSetModal.style.display = 'block';
            }
        })

        cancelBtn.addEventListener('click', async(e) => {
            router.navigate('home-screen');
        })
    }

    static get observedAttributes() {
        return ['count', 'content', 'answer1', 'answer2', 'answer3', 'answer4', 'check1', 'check2', 'check3', 'check4'];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (attribute === 'count') {
            this.questionCount = newValue;
            this.previewItem = this.parentElement.querySelector('preview-column').shadowRoot
                .querySelector(`[count='${newValue}']`);
        }

        if (attribute === 'content') {
            this._shadowDom.querySelector('#question-input').value = (newValue === 'null' ? '' : newValue);
        }

        if (attribute === 'answer1') {
            this._shadowDom.querySelector('#ans1').value = (newValue === 'null' ? '' : newValue);
        }

        if (attribute === 'answer2') {
            this._shadowDom.querySelector('#ans2').value = (newValue === 'null' ? '' : newValue);
        }

        if (attribute === 'answer3') {
            this._shadowDom.querySelector('#ans3').value = (newValue === 'null' ? '' : newValue);
        }

        if (attribute === 'answer4') {
            this._shadowDom.querySelector('#ans4').value = (newValue === 'null' ? '' : newValue);
        }

        if (attribute === 'check1') {
            this._shadowDom.querySelector('#check1').checked = (newValue === 'checked' ? true : false);
        }

        if (attribute === 'check2') {
            this._shadowDom.querySelector('#check2').checked = (newValue === 'checked' ? true : false);
        }

        if (attribute === 'check3') {
            this._shadowDom.querySelector('#check3').checked = (newValue === 'checked' ? true : false);
        }

        if (attribute === 'check4') {
            this._shadowDom.querySelector('#check4').checked = (newValue === 'checked' ? true : false);
        }
    }
}

window.customElements.define('quiz-input', QuizInput)

const style = `
<style>
    #question-create-box{
        width: calc(100% - 400px);
        margin-left: 350px;
        font-family: 'JetBrains Mono', monospace;
        opacity: 0.8;
    }
    #question-input{     
        height: 160px;
        width: 100%;
        background-color: #252525;
        border: none;
        outline: none;
        color: #fff;
        padding: 60px;
        box-sizing: border-box;
        border-radius: 10px;
        font-size: 30px;
        text-align: center;
    }
    .answer-input-row{
        height: 120px;
        background-color: wheat;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    .answer{
        background-color:#252525;
        color: #fff;
        font-size: 25px;
        display: flex;
        align-items: center;
        padding-left: 20px;
        margin-top: 10px;
        border-radius: 10px;
    }
    .answer textarea{  
        background-color: #252525;
        height: 70px;
        width: 97%;
        right: 0;
        border: none;
        outline: none;
        color: #fff;
        padding: 20px 10px;
        box-sizing: border-box;
        font-size: 25px;
    }
    .ans-decor{
        width: 15px;
        height: 40px;
        border-radius: 30px;
        margin-right: 20px;
    }
    .color-red{
        background-color: #1fceab;
    }
    .color-blue{
        background-color: #c20440;
    }
    .correct-check{
        height: 35px;
        width: 35px;
        margin-right: 15px;
        background: #666666;
        color: #ffffff;
    }
    .redirect-btns{
        display: flex;
        float: right; 
        margin-top: 100px;
    }
    #summit-btn, #cancel-btn{
        font-family: 'JetBrains Mono', monospace;
        font-size: 1rem;
        width: 150px;
        height: 40px;
        background-color:#fff;
        border: none;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
        margin-left: 3vw;
        right: 5vw;
        transition: .5s;
    }
    #summit-btn:hover, #cancel-btn:hover{
        cursor: pointer;
        box-shadow: 4px 4px 0 #c20440,-4px -4px 0 #1fceab;
        transition: .5s;
    }

    textarea{
        border-sizing: border-box;
        resize: none;
        overflow: auto;
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

    @media only screen and (max-width: 817px){
        #question-create-box{
            margin: auto;
            width: 80vw;
        }
        #question-input{     
            height: 125px;
            width: 100%;
            font-size: 20px;
            padding: 50px 20px;
        }
        .answer{
            font-size: 18px;
            height: 60px;
        }
        .answer textarea{  
            font-size: 18px;
            height: 60px;        
        }
        .redirect-btns{
            margin-top: 50px;
        }
        #summit-btn, #cancel-btn{
            top: 75vh;
            font-size: 15px;
            width: 120px;
            height: 40px;
        }
        /* width */
        ::-webkit-scrollbar {
            width: 5px;
        }
    }
</style>
`