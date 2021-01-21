export default class CreatorHeader extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this._shadowDom.innerHTML = `
            ${style} 
            <div class="main-header">
                <div class="logo"><img src="./img/Logo.png" alt="logo"></div>
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

window.customElements.define('creator-header', CreatorHeader)

const style = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="https://fonts.googleapis.com/css2?family=Rowdies&display=swap" rel="stylesheet">
<style>
    .main-header{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100px;
        background-color: #010101;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .logo img {
        position: relative;
        padding: 30px 50px;
        max-width: 190px;
        transition: 0.5s;
        cursor: pointer;
    }

    .logo img:hover {
        max-width: 200px;
        transition: 0.5s;
    }
    .header-right-bar{
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
    }
    .user-icon{
        margin-right: 4vw;
        color: #fff;
        font-size: 40px;
    }
    .user-icon:hover{
        cursor: pointer;
        text-shadow: 4px 4px 0 #69C9D0,-4px -4px 0 #EE1D52;
    }
    @media only screen and (max-width: 786px){
        .main-header{
            height: 70px;
        }
        .logo img{
            max-width: 150px;
            transition: .5s;
        }
        .logo img:hover {
            max-width: 160px;
            transition: 0.5s;
        }
        .user-icon{
            font-size: 35px;
        }
    }
    @media only screen and (max-width: 425px){
        .main-header{
            height: 80px
        }
        .logo img{
            max-width: 100px;
            transition: .5s;
        }
        .logo img:hover {
            max-width: 110px;
            transition: 0.5s;
        }
        .user-icon{
            font-size: 28px;
        }
    }
</style>
`