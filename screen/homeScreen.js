const style = `
<style>
    .main{
        margin-top: 150px;
    }

    @media only screen and (max-width: 786px){
        .main{
            margin-top: 100px;
        }
    }
</style>
`

class HomeScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.quizSetUrl = this.getAttribute('url') || '';

        this._shadowDom.innerHTML = `
            ${style}       
            <div class='home-container'> 
                <home-header></home-header>
                <div class='main'> 
                    <quiz-info-list></quiz-info-list> 
                    <create-plus-btn></create-plus-btn>
                </div> 
            </div>
        `

        const createQuizSetBtn = this._shadowDom.querySelector('create-plus-btn');
        createQuizSetBtn.addEventListener('click', e => {
            router.navigate('quiz-creator');
        })

    }
}

window.customElements.define('home-screen', HomeScreen)