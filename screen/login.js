import { getAccountDocByUserName, writeToLocalStorage } from '../utils.js'

const style = `
    :root {
        --clr-dark-background: #171718;
        --clr-darker-background: #0d0d0e;
        --clr-dark-red: #c20440;
        --clr-dark-blue: #1fceab;
        --clr-dark-white: #fefdff;
        --clr-dark-grey: #575557;

        --ff-title: 'Source Sans Pro', sans-serif;
        --ff-content: 'JetBrains Mono', monospace;
    }

    .section {
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: var(--clr-acce);
    }


    body {
        font-family: 'JetBrains Mono', monospace;
    }
    .box {
        display: block;
        z-index: 4;
    }

    .box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 600px;
        background: rgba(0, 0, 0, 0.85);
        padding: 40px;
        box-sizing: border-box;
        border: 3px solid var(--clr-accent);
        border-radius: 10px;
        box-shadow: 10px 10px #1fceab, -10px -10px #c20440 ;
    }

    .img-container {
        display: flex;
        align-items: center;

    }
    .section .box .img-container img {
        width: 300px;
        margin: auto;
    }
    .box h2{
        font-size: 4rem;
        margin: 0 0 40px;
        padding: 0;
        color: #fefdff;
        font-family: 'Source Sans Pro', sans-serif;

    }

    .box input {
        padding: 10px 0;
        margin-bottom: 35px;
    }

    .box input {
        width: 100%;
        box-sizing: border-box;
        box-shadow: none;
        outline: none;
        border: none;
        border-bottom: 3px solid #1fceab;
        background: none;
        color: #1fceab;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 600;
        font-size: 1.2rem;
    }
    html {

    }

    .box button {
        display: block;
        margin: auto;
        border-bottom: 4px solid #4be2c4;
        cursor: pointer;
        border-radius: 20px;
        background: #1fceab;
        width: 60%;
        color: #fefdff;
        font-family: 'JetBrains Mono', monospace;
        font-size: 1.3rem;
        font-weight: 800;
        text-transform: bold;
        box-shadow: 0px 5px 0 #218f79;
        margin-bottom: 0;
        outline: none;
        text-transform: uppercase;
        transition: .2s;
        padding: 10px 0;
    }

    .box button:active {
        box-shadow: none;
        transform: translateY(5px);
        transition: .2s;

    }

    .box form div {
        position: relative;
    }

    .box form div label {
        position: relative;
        font-size: 30px;
        top: -110px;
        left: 0;
        color: #5c5c5c;
        transition: .5s;
        pointer-events: none;
        font-family: 'JetBrains Mono', monospace;
    }

    .box input:focus ~ label
    {
        top: -110px;
        left: 0;
        color: #c20440;
        font-size: 25px;
        font-weight: bold;
    }

    .box input:focus
    {
        border-bottom: 2px solid #c20440;
    }


    * {
        margin: 0;
        padding: 0;
    }
    body {
        font-family: 'Baloo 2', cursive;
    }
    .banner-text {
        width: 100%;
        position: absolute;
        z-index: 1;
    }
    .banner-text ul {
        height: 50px;
        float: right;
    }
    .banner-text ul li {
        display: inline-block;
        padding: 40px 15px;
        text-transform: uppercase;
        color: #fff;
        font-size: 20px;
    }
    .banner-text ul li:hover {
        cursor: pointer;
    }
    .banner-text h2 {
        text-align: center;
        color: #fff;
        font-size: 50px;
        margin-top: 20%;
    }

    /* animated background */

    .animation-area {
        background: linear-gradient( #020202, #242424, #020202);
        width: 100%;
        height: 100vh;
    }
    .box-area {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .box-area li {
        position: absolute;
        display: block;
        list-style: none;
        width: 25px;
        height: 25px;
        border-radius: 10px;;
        background: rgba(87, 250, 215, 0.6);
        box-shadow: 10px 5px 5px rgba(223, 76, 88, 0.6);
        animation: animate 20s linear infinite;
        bottom: -150px;
    }
    .box-area li:nth-child(1) {
        left: 86%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
    }
    .box-area li:nth-child(2) {
        left: 12%;
        width: 30px;
        height: 30px;
        animation-delay: 1.5s;
        animation-duration: 10s;
    }
    .box-area li:nth-child(3) {
        left: 70%;
        width: 100px;
        height: 100px;
        animation-delay: 5.5s;
    }
    .box-area li:nth-child(4) {
        left: 42%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 15s;
    }
    .box-area li:nth-child(5) {
        left: 65%;
        width: 40px;
        height: 40px;
        animation-delay: 0s;
    }
    .box-area li:nth-child(6) {
        left: 15%;
        width: 110px;
        height: 110px;
        animation-delay: 3.5s;
    }
    @keyframes animate {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-800px) rotate(360deg);
            opacity: 0;
        }
    }

    .register {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'JetBrains Mono', monospace;
    }

    .register h3 {
        padding: 20px 0;
        color: #575557;
    }

    .register h3 a {
        text-decoration: none;
        color: #1fceab;
        transition: .2s;
        cursor: pointer;
    }

    .register h3 a:hover {
        text-decoration: underline;
        color: #c20440;
        transition: .2s;
    }
    @media only screen and (max-width: 786px) {
        .box{
            width: 90%;
        }
        .section .box .img-container img{
            width: 250px;
            margin: auto;
        }
    }

    @media (max-width: 1000px) {
        .section .box .img-container img {
            width: 250px;
            margin: auto;
            transition: .5s; 
        }
        .box {
            width: 500px;
            transition: .5s;
        }
        .box h2{
            font-size: 3rem;
            margin: 0 0 30px;
            transition: .5s;
        }
        .box input {
            padding: 10px 0;
            margin-bottom: 35px;
        }
        
        .box input {
            border-bottom: 2px solid #1fceab;
            font-size: 1rem;
        }
        
        .box button {
            cursor: pointer;
            border-radius: 15px;
            width: 50%;
            font-size: 1.3rem;
            transition: .1s;
            padding: 8px 0;
        }
        
        .box button:active {
            box-shadow: none;
            transform: translateY(5px);
            transition: .1s;
        }
    }
    
    @media (max-width: 700px) {
        .section .box .img-container img {
            width: 200px;
            margin: auto;
            transition: .5s; 
        }
        .box {
            width: 450px;
            transition: .5s;
            padding: 30px;
        }
        .box h2{
            font-size: 2.7rem;
            margin: 0 0 30px;
            transition: .5s;
        }
        
        .box button {
            cursor: pointer;
            border-radius: 15px;
            width: 50%;
            font-size: 1.3rem;
            transition: .1s;
            padding: 8px 0;
        }
        
        .box button:active {
            box-shadow: none;
            transform: translateY(5px);
            transition: .1s;
        }
        .register h3 {
            font-size: 1rem;
            transition: .5s;
        }
    }
    @media (max-width: 500px) {
        .section .box .img-container img {
            width: 200px;
            margin: auto;
            transition: .5s; 
        }
        .box {
            width: 400px;
            transition: .5s;
            padding: 20px;
        }
        .box h2{
            font-size: 2.5rem;
            margin: 0 0 30px;
            transition: .5s;
        }
        
        .box button {
            cursor: pointer;
            border-radius: 15px;
            width: 40%;
            font-size: 1rem;
            transition: .1s;
            padding: 5px 0;
        }
        
        .box button:active {
            box-shadow: none;
            transform: translateY(5px);
            transition: .1s;
        }
        .register h3 {
            font-size: 1rem;
            transition: .5s;
        }
    }
    @media (max-width: 430px) {
        .section .box .img-container img {
            width: 200px;
            margin: auto;
            transition: .5s; 
        }
        .box {
            width: 370px;
            transition: .5s;
            padding: 20px;
        }
        .box h2{
            font-size: 2.5rem;
            margin: 0 0 30px;
            transition: .5s;
        }
        
        .box button {
            cursor: pointer;
            border-radius: 15px;
            width: 40%;
            font-size: 1rem;
            transition: .1s;
            padding: 5px 0;
        }
        
        .box button:active {
            box-shadow: none;
            transform: translateY(5px);
            transition: .1s;
        }
        .register h3 {
            font-size: 1rem;
            transition: .5s;
        }
    }

`
class LoginScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    setError(id, message) {
        this._shadowRoot.getElementById(id).setAttribute('error', message)
    }
    connectedCallback() {
        this._shadowRoot.innerHTML = `
        <style>
            ${style}
        </style>

        <div class="section">
            <div class="box">
                <div class="img-container">
                    <img src="./img/Logo.png" alt="Queazy-Logo">
                </div>
                <h2>Log in</h2>
                <form id="login-form">
                <input-wrapper id="userName" type="text" placeholder="User name">User name</input-wrapper>
                <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
                    <button type="submit" id="submit">Log in</button>
                </form>
                <div class="register">
                    <h3>Don't have an account? <a id="redirect">Sign up</a></h3>
                </div>
            </div>
            <div class="animation-area">
                <ul class="box-area">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
        `
        const loginForm = this._shadowRoot.getElementById('login-form')
        loginForm.addEventListener('submit', async(e) => {
            e.preventDefault()
            const userName = this._shadowRoot.getElementById('userName').value
            const password = this._shadowRoot.getElementById('password').value
            let isValid = true

            if (userName.trim() === '') {
                isValid = false
                this.setError('userName', 'Please input your user name')
            }
            if (password.trim() === '') {
                isValid = false
                this.setError('password', 'Please input password')
            }
            if (!isValid) {
                return
            }

            const accountDoc = await getAccountDocByUserName(userName)
            if (accountDoc) {
                if (CryptoJS.MD5(password).toString(CryptoJS.enc.Hex) === accountDoc.password) {
                    writeToLocalStorage('currentUser', {
                        'id': accountDoc.id,
                        'userName': accountDoc.userName,
                        'password': accountDoc.password
                    });
                    router.navigate('home-screen')
                } else {
                    this.setError('password', `Incorrect password.`)
                }

            }

        })
        this._shadowRoot.querySelector('.register h3 a').addEventListener('click', () => {
            router.navigate('signup-screen')
        })
    }
}
window.customElements.define('login-screen', LoginScreen)