import Account from "../../model/Account.js";
import { getItemFromLocalStorage, getAccountDocByUserName } from "../../utils.js";

class QuizInfolist extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    async connectedCallback() {
        this.filterTitle = this.getAttribute('filter') || '';

        const currentUser = getItemFromLocalStorage('currentUser');
        const accountDoc = await getAccountDocByUserName(currentUser.userName);
        const account = await Account.parseDocument(accountDoc);

        this.quizCollection = account.quizCollection;

        let quizInfoListHtml = '';

        this.quizCollection.forEach(quizSet => {
            if (quizSet.title.includes(this.filterTitle))
                quizInfoListHtml += `
                    <quiz-info-item 
                        title="${quizSet.title}"
                        time="${quizSet.createdDate}"
                        question-no="${quizSet.quizList.length}"
                        record-count="${quizSet.recordCount}"
                        description="${quizSet.description}"
                        id=${quizSet.id}>
                    </quiz-info-item>
                `
        })

        this._shadowDom.innerHTML = `
            ${style}
            <div class="quiz-info-list">${quizInfoListHtml}</div>
            <div id="quizset-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close">&times;</span>
                        <h2>Copy url complete. Time to challenge your friends!</h2>
                    </div>
                </div>
            </div>
        `

        const quizSetModal = this._shadowDom.querySelector('#quizset-modal');
        const closeModalBtn = this._shadowDom.querySelector('.close');
        closeModalBtn.addEventListener('click', e => {
            quizSetModal.style.display = 'none';
        })
    }

    static get observedAttributes() {
        return ['filter'];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (attribute === 'filter') {
            let quizInfoListHtml = '';

            this.quizCollection.forEach(quizSet => {
                if (quizSet.title.toLowerCase().includes(newValue.toLowerCase()))
                    quizInfoListHtml += `
                        <quiz-info-item 
                            title="${quizSet.title}"
                            time="${quizSet.createdDate}"
                            question-no="${quizSet.quizList.length}"
                            record-count="${quizSet.recordCount}"
                            description="${quizSet.description}"
                            id=${quizSet.id}>
                        </quiz-info-item>
                    `
            })

            this._shadowDom.querySelector('.quiz-info-list').innerHTML = quizInfoListHtml;
        }
    }
}

window.customElements.define('quiz-info-list', QuizInfolist)

const style = `
<style>
    .quiz-info-list{
        background: rgba(1, 1, 1, 0);
    }

    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 400px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    .modal-content {
        position: relative;
        background-color: #fefefe;
        font-family: 'Rowdies', cursive;
        margin: auto;
        padding: 0;
        width: 50%;
        border-radius: 10px;
        animation-name: animatetop;
        animation-duration: 0.5s;
    }

    @keyframes animatetop {
        from {top:-300px; opacity:0}
        to {top:0; opacity:1}
    }

    .close {
        color: white;
        float: right;
        font-size: 28px;
        font-weight: bold;
        transition: .5s;
    }
      
    .close:hover, .close:focus {
        color: #828282;
        text-decoration: none;
        cursor: pointer;
        transition: .5s;
    }
      
    .modal-header {
        padding: 2px 16px;
        background-color: #252525;
        color: white;
        border-radius: 5px;
        text-align: center;
    }

    @media only screen and (max-width: 1024px){
        .modal{
            padding-top: 350px;
        }
    }

    @media only screen and (max-width: 571px){
        .modal{
            padding-top: 230px;
        }
    }
</style>
`