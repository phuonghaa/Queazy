const style = `
.main{
    margin-top: 100px;
}
`

class QuizRecord extends HTMLElement{
    constructor(){
        super()
        this._shadowDom = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.id = this.getAttribute('id');
        this._shadowDom.innerHTML=`
        <style>
            ${style}
        </style>
        <quiz-header></quiz-header>
        <div class='main'>
            <animation-bg></animation-bg>
            <record-container id=${this.id}></record-container>
        </div>
        `
    }
}

window.customElements.define('quiz-record', QuizRecord)