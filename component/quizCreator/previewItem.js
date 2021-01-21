import Answer from "../../model/Answer.js";
import Quiz from "../../model/Quiz.js";

export default class PreviewItem extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.questionCount = this.getAttribute('count') || '';
        this.questionContent = this.getAttribute('content') || ''
        this.answer1 = this.getAttribute('answer1') || '';
        this.answer2 = this.getAttribute('answer2') || '';
        this.answer3 = this.getAttribute('answer3') || '';
        this.answer4 = this.getAttribute('answer4') || '';
        this.check1 = this.getAttribute('check1') || '';
        this.check2 = this.getAttribute('check2') || '';
        this.check3 = this.getAttribute('check3') || '';
        this.check4 = this.getAttribute('check4') || '';

        this._shadowDom.innerHTML = `
            ${style}
            <div class="preview-question">
                <div class="question-count">Question ${this.questionCount}:</div>
                <div class="question-row">
                    <div class="question-window">
                        <div class="question-box">${this.questionContent}</div>
                        <div class="ans-row">
                            <div class="ans-box"></div>
                            <div class="ans-box"></div>
                        </div>
                        <div class="ans-row">
                            <div class="ans-box"></div>
                            <div class="ans-box"></div>
                        </div>
                    </div>
                    <div id="delete-btn"> <i class="fa fa-trash"></i> </div>
                </div>
            </div>
        `

        const previewItemList = this.parentElement;
        const questionWindow = this._shadowDom.querySelector('.question-window');
        const deletePreviewItem = this._shadowDom.querySelector('#delete-btn');

        questionWindow.addEventListener('click', e => {
            this.displayQuestion();
        })

        deletePreviewItem.addEventListener('click', e => {
            const previewColumn = this.getRootNode().host;
            previewColumn.previewItemCount -= 1;
            previewItemList.removeChild(this);

            const firstItem = previewItemList.children[0]
            if (firstItem !== null) firstItem.displayQuestion();

            for (let i = 0; i < previewColumn.previewItemCount; i++) {
                const previewItem = previewItemList.children[i];
                previewItem.setAttribute('count', i + 1);
            }
        })
    }

    /**
     * @returns {Quiz}
     */
    toQuiz() {
        const quiz = new Quiz(this.getAttribute('content'));
        quiz.addAnswer(new Answer(this.getAttribute('answer1'), this.getAttribute('check1') === 'checked' ? true : false));
        quiz.addAnswer(new Answer(this.getAttribute('answer2'), this.getAttribute('check2') === 'checked' ? true : false));
        quiz.addAnswer(new Answer(this.getAttribute('answer3'), this.getAttribute('check3') === 'checked' ? true : false));
        quiz.addAnswer(new Answer(this.getAttribute('answer4'), this.getAttribute('check4') === 'checked' ? true : false));
        return quiz;
    }

    isValidPreviewItem() {
        return this.getAttribute('content') !== null &&
            this.getAttribute('answer1') !== null &&
            this.getAttribute('answer2') !== null &&
            this.getAttribute('answer3') !== null &&
            this.getAttribute('answer4') !== null &&
            (this.getAttribute('check1') === 'checked' ||
                this.getAttribute('check2') === 'checked' ||
                this.getAttribute('check3') === 'checked' ||
                this.getAttribute('check4') === 'checked')
    }

    displayQuestion() {
        const quizInput = this.getRootNode().host.parentElement.querySelector('quiz-input');
        quizInput.setAttribute('count', this.getAttribute('count'));
        quizInput.setAttribute('content', this.getAttribute('content'));
        quizInput.setAttribute('answer1', this.getAttribute('answer1'));
        quizInput.setAttribute('answer2', this.getAttribute('answer2'));
        quizInput.setAttribute('answer3', this.getAttribute('answer3'));
        quizInput.setAttribute('answer4', this.getAttribute('answer4'));
        quizInput.setAttribute('check1', this.getAttribute('check1'));
        quizInput.setAttribute('check2', this.getAttribute('check2'));
        quizInput.setAttribute('check3', this.getAttribute('check3'));
        quizInput.setAttribute('check4', this.getAttribute('check4'));
    }

    static get observedAttributes() {
        return ['count', 'content', 'answer1', 'answer2', 'answer3', 'answer4', 'check1', 'check2', 'check3', 'check4'];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (attribute === 'count') {
            const questionCount = this._shadowDom.querySelector('.question-count');
            if (questionCount !== null) questionCount.innerHTML = `Question ${newValue}:`;
        }
        if (attribute === 'content') {
            this._shadowDom.querySelector('.question-box').innerHTML = (newValue !== 'null' ? newValue : '');
        }
    }
}

window.customElements.define('preview-item', PreviewItem)

const style = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
    .preview-question{
        padding: 10px 15px;
    }
    .preview-question:hover{
        background-color: #636262;
    }
    .question-order{      
        font-size: 18px;   
    }
    .question-row{
        display: flex;
    }
    .question-window{
        margin-top: 7px;
        width: 220px;
        background-color: #010101;
    }
    .question-box{
        display: block;
        text-align: center;
        line-height: 40px;
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
        font-size: 10px;
        box-sizing: border-box;

        margin: 15px auto 10px;
        width: 180px;
        height: 50px;
        background-color: #252525;
    }
    .ans-row{
        margin: 0 auto 10px;
        width: 180px;
        height: 30px;
        display: flex;
        justify-content: space-between;
    }
    .ans-box{
        height: 30px;
        width: 85px;
        background-color: #252525;
    }
    #delete-btn{
        font-size: 22px;
        align-self: flex-end;
        margin-left: 10px;
        transition: .5s;
    }
    #delete-btn:hover{
        cursor: pointer;
        text-shadow: 3px 3px 0 #c20440,-3px -3px 0 #1fceab;
        transition: .5s;
    }
    .add-question-btn{
        margin: 30px auto;
        width: 200px;
        height: 40px;
        background-color: white;
        border-radius: 30px;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .add-question-btn:hover{
        cursor: pointer;
        box-shadow: 4px 4px 0 #c20440,-4px -4px 0 #1fceab;
        transition: .5s;
    }

    @media only screen and (max-width: 817px){
        .preview-question{
            height: 100px;
        }   
        .question-order{      
            font-size: 12px;   
        }
        .question-window{
            width: 100px;
            height: 70px;
        }
        .question-box{
            display: block;
            text-align: center;
            line-height: 20px;
            text-overflow: ellipsis;
            overflow: hidden; 
            white-space: nowrap;
            font-size: 10px;
            box-sizing: border-box;
            margin: 8px auto 10px;
            width: 80px;
            height: 20px;
            background-color: #252525;
        }
        .ans-row{
            margin: 0 auto 5px;
            width: 80px;
            height: 10px;
            display: flex;
            justify-content: space-between;
        }
        .ans-box{
            height: 10px;
            width: 35px;
            background-color: #252525;
        }
        #delete-btn{
            font-size: 20px;
            align-self: flex-end;
            margin-left: 10px
        }
    }
</style>
`