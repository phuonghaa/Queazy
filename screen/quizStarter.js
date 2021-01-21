const style = `
.main{
    margin-top: 0px;
    position: fixed;
    width: 100%;
}
`

class QuizStarter extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this.id = this.getAttribute('id');
        this._shadowDom.innerHTML = `
        <style>
            ${style}
        </style>
        <quiz-header></quiz-header>
        <div class='main'>
            <animation-bg></animation-bg>
            <starter-container id=${this.id}></starter-container>
        </div>
        `
    }

}

window.customElements.define('quiz-starter', QuizStarter)