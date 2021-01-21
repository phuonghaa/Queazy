const style = `
.main-header{
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #010101;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 6;
}
.logo img{
    margin-left: 4vw;
    max-width: 190px;
    transition: .5s;
}
.logo:hover{
    cursor:pointer;
    max-width: 200px;
    transition: .5s;
}
.header-right-bar{
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
}

@media only screen and (max-width: 1000px){
    .main-header{
        height: 70px;
    }
    .logo img{
        margin-left: 3vw;
        max-width: 150px;
        transition: .5s;
    }
    .logo:hover{
        cursor:pointer;
        max-width: 160px;
        transition: .5s;
    }
    .user-icon{
        font-size: 35px;
    }
}
@media only screen and (max-width: 400px){
    .main-header{
        height: 80px
    }
    .logo img{
        margin-left: 3vw;
        max-width: 100px;
        transition: .5s;
    }
    .logo:hover{
        cursor:pointer;
        max-width: 110px;
        transition: .5s;
    }
    .user-icon{
        font-size: 28px;
    }
}
`

class QuizHeader extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this._shadowDom.innerHTML = `
       
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Rowdies&display=swap" rel="stylesheet">

        <style>
            ${style} 
         </style>
         
        <div class="main-header">
            <div class="logo"><img src="./img/Logo.png" class="logo" alt="logo"></div>
            <div class="header-right-bar">
                <div class="theme-toggle"></div>
            </div>
        </div>
        `

        const logo = this._shadowDom.querySelector('.logo');
        logo.addEventListener('click', e => {
            router.navigate('home-screen');
        })
    }
}

window.customElements.define('quiz-header', QuizHeader)