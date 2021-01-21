const style = `

html {
margin: 0;
padding: 0;
text-decoration: none;
list-style: none;
box-sizing: border-box;
}
body {
    background: #171718;
    transition: 0.7s; 
}
/* Header, Logo, buttons menu */
header {
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100px;
    width: 100%;
    padding: 10px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #171718;
}
header .logo {
    position: relative;
    max-width: 190px;
    transition: 0.5s;
}
header .logo:hover {
    max-width: 220px;
    transition: 0.5s;
}
header ul {
    float: right;
    margin-right: 20px;
}
header ul li {
    display: inline-block;
    line-height: 80px;
    margin: 0 5px;
}
.cool-link {
    display: inline-block;
    color: #fefdff;
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.5rem;
    font-weight: 400;
    margin-left: 40px;
    text-decoration: none;
    transition: 0.8s;
}
.cool-link:hover {
    color: #1fceab;
    font-size: 1.6rem;
    transition: 0.5s;
}
.cool-link::after {
    content: '' ;
    display: block;
    width: 0;
    height:2px;
    background: #c20440;
    transition: .3s;
}
.cool-link:hover::after {
    width:100%;
    transition: .5s;
}
.check-btn {
    font-size: 37px;
    color: #1fceab;
    float: right;
    line-height: 80px;
    margin-right: 40px;
    cursor: pointer;
    display: none;
    transition: .6s;
}
.check-btn:hover {
text-shadow: -2px -2px #c20440;
transition: .6s;
}
#check {
    display: none;
}
@media (max-width: 1345px) {
    header .logo {
        padding-left: 25px;
    }
    .cool-link {
        font-size: 1.2rem;
    }
    .cool-link:hover {
        font-size: 1.25rem;
    }
}
@media (max-width: 1100px) {
    .check-btn {
        display: block;
    }
    header ul {
        position: fixed;
        width: 100%;
        height: 100vh;
        background: #0d0d0e;
        top: 80px;
        left: -200%;
        text-align: center;
        transition: all 1s;
        z-index: 5;
        opacity: 97%;
    }
    header ul li {
        display: block;
        margin: 50px 0;
        line-height: 30px;
    }
    .cool-link:hover {
        font-size: 1.2rem;
    }
    #check:checked ~ ul{
        left: -3%;
    } 
    .check-btn {
    float: right;
    }
}
/* slider */
.container-all {
align-items: center;
}
.slider {
margin: auto;
margin-top: 100px;
position: relative;
width: 1600px;
height: 810px;
/* padding: 50px; */
transition: .5s;
}
.slider .slide {
margin-top: 40px;
z-index: 1;
position: absolute;
width: 100%;
clip-path: circle(0% at 0 50%);
}
.slider .slide.active {
clip-path: circle(150% at 0 50%);
transition: 2s;
transition-property: clip-path;
}
.slider .slide img{
z-index: 1;
width: 100%;
border-radius: 7px;
}
.slider .slide .content {
position: absolute;
top: 0;
padding: 15px 30px;
margin: 100px 100px;
background-color: rgba(0, 0, 0, 0.3);
border-radius: 10px;
transition: .5s;
}
.slider .slide .content h2 {
color: #fefdff;
font-family: 'Source Sans Pro', sans-serif;
font-size: 80px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 2px;
}
.slider .slide .content p {
color: #fefdff;
font-family: 'JetBrains Mono', monospace;
font-size: 30px;
width: 100%;
padding: 10px;
border-radius: 4px;
}
.slider .slide .content span {
color: #1fceab;
text-shadow: -5px 5px #c20440;
}
.slider .navigation {
z-index: 2;
position: absolute;
display: flex;
bottom: 30px;
left: 46%;
transform: translateY(-50%);
}
.slider .navigation .btn {
background: rgba(31, 206, 171, 0.8);
width: 15px;
height: 15px;
margin: 10px;
border-radius: 50%;
cursor: pointer;
transition: .3s;
}
.slider .navigation .btn.active {
background: rgba(194, 4, 64, 0.8);
transition: .3s;
}
.slider button a{
text-decoration: none;
}
.slider button {
border: 3px solid #1fceab;
border-radius: 5px;
background: none;
padding: 18px 20px;
font-size: 40px;
font-family: 'JetBrains Mono', monospace;
cursor: pointer;
margin-top: 30px;
transition: 0.8s;
position: relative;
overflow: hidden;
outline: none;
z-index: 2;
margin: 10px;
}
.slider button a{
color: #1fceab;
transition: 0.8s;
}
.slider button:hover{
box-shadow: -5px -5px #c20440;
}
.slider button a:hover {
color: #0effcf;
text-shadow: -2px -2px #c20440;
transition: 0.8s;
}
.slider button::before {
content: "";
position: absolute;
left: 0;
width: 100%;
height: 0%;
background: rgba(31, 206, 171, 0.7);
z-index: -1;
transition:0.8s; 
top: 0;
border-radius: 0 0 50% 50%;
}
.slider button:hover::before {
height: 190%;
}
@media (max-width: 1565px) {
.slider {
    width: 1200px;
    height: 605px;
}
.slider .slide .content {
    margin: 80px 80px;
}
.slider .slide .content h2 {
    font-size: 60px;
}
.slider .slide .content p {
    width: 100%;
}
.slider .navigation {
    bottom: 25px;
}
.slider .navigation .btn {
    width: 12px;
    height: 12px;
    margin: 8px;
}
.slider button {
    padding: 15px 25px;
    font-size: 32px;
}
}
@media (max-width: 1300px) {
.slider {
    width: 1000px;
    height: 500px;
}
.slider .slide .content {
    margin: 50px 50px;
}
.slider .slide .content h2 {
    font-size: 50px;
}
.slider .slide .content p {
    width: 70%;
    font-size: 20px;
}
.slider .navigation {
    bottom: 20px;
}
.slider .navigation .btn {
    width: 10px;
    height: 10px;
    margin: 6px;
}
.slider button {
    padding: 12px 22px;
    font-size: 30px;
}
}
@media (max-width: 1050px) {
    .slider {
        width: 850px;
        height: 425px;
    }
    .slider .slide .content {
        margin: 20px 20px;
    }
    .slider .slide .content h2 {
        font-size: 40px;
    }
    .slider .slide .content p {
        width: 70%;
        font-size: 15px;
    }
    .slider .navigation {
        bottom: 15px;
    }
    .slider .navigation .btn {
        width: 9px;
        height: 9px;
        margin: 5px;
    }
    .slider button {
        padding: 10px 20px;
        font-size: 25px;
    }
}
@media (max-width: 900px) {
    .slider {
        width: 700px;
        height: 350px;
    }
    .slider .slide .content {
        margin: 20px 20px;
    }
    .slider .slide .content h2 {
        font-size: 30px;
    }
    .slider .slide .content p {
        width: 90%;
        font-size: 15px;
    }
    .slider .navigation {
        bottom: 0px;
    }
    .slider .navigation .btn {
        width: 9px;
        height: 9px;
        margin: 5px;
    }
    .slider button {
        padding: 10px 20px;
        font-size: 20px;
    }
}
@media (max-width: 720px) {
    header {
        padding: 10px 0;
        transition: .5s;
    }
    
    .slider {
        width: 600px;
        height: 350px;
    }
    .slider .slide .content {
        margin: 20px 20px;
    }
    .slider .slide .content h2 {
        font-size: 30px;
    }
    .slider .slide .content p {
        width: 90%;
        font-size: 15px;
    }
    .slider .navigation {
        bottom: 0px;
    }
    .slider .navigation .btn {
        width: 9px;
        height: 9px;
        margin: 5px;
    }
    .slider button {
        padding: 10px 20px;
        font-size: 20px;
    }
    #check:checked ~ ul{
        left: -7%;
    } 
}
@media (max-width: 620px) {
    header {
        padding: 10px 0;
        transition: .5s;
    }
    
    .slider {
        width: 470px;
        height: 350px;
    }
    .slider .slide .content {
        margin: 10px 45px;
        transition: .5s;
    }
    .slider .slide .content h2 {
        font-size: 25px;
        transition: .5s;
    }
    .slider .slide .content p {
        width: 90%;
        font-size: 15px;
    }
    .slider .navigation {
        bottom: 0px;
    }
    .slider .navigation .btn {
        display: none;
    }
    .slider button {
        padding: 10px 10px;
        font-size: 20px;
    }
    #check:checked ~ ul{
        left: -8%;
    } 
}
@media (max-width: 480px) {
    header {
        padding: 10px 0;
        transition: .5s;
    }
    
    .slider {
        width: 400px;
        height: 350px;
    }
    .slider .slide .content {
        padding: 0;
        margin: 10px 40px;
        transition: .5s;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .slider .slide .content h2 {
        font-size: 25px;
        transition: .5s;
    }
    .slider .slide .content p {
        width: 90%;
        font-size: 15px;
        padding-bottom: 50px;
    }
    .slider .navigation {
        bottom: 0px;
    }

    .slider button {
        padding: 10px 50px;
        font-size: 20px;
    }
    #check:checked ~ ul{
        left: -11%;
    } 
}
@media (max-width: 400px) {
    header {
        padding: 10px 0px;
        transition: .5s;
    }
    
    .slider {
        width: 350px;
        height: 350px;
    }
    .slider .slide .content {
        padding: 0;
        margin: 10px 35px;
        transition: .5s;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .slider .slide .content h2 {
        font-size: 20px;
        transition: .5s;
    }
    .slider .slide .content p {
        width: 90%;
        font-size: 15px;
        padding-bottom: 40px;
    }
    .slider .navigation {
        bottom: 0px;
    }

    .slider button {
        padding: 10px 50px;
        font-size: 15px;
        transition: .5s;
    }
    #check:checked ~ ul{
        left: -12%;
    } 
}
/* Footer */
footer {
margin: 0;
padding: 0;
margin-top: 20vh;
color: #fefdff;
font-family: 'JetBrains Mono', monospace;
box-sizing: border-box;
bottom: 0px;
width: 100%;
background: #0d0d0e;
}
.main-content {
display: flex;
}
.main-content .box {
flex-basis: 50%;
padding: 10px 20px;
}
.box h2 {
font-size: 1.5rem;
font-weight: 600;
text-transform: uppercase;
}
.box .content {
margin: 20px 0 0 0;
position: relative;
}
.box .content:before {
position: absolute;
content: '';
top: -10px;
height: 2px;
width: 100%;
background: #1fceab;
}
.box .content:after{
position: absolute;
content: '';
height: 2px;
width: 15%;
background: #c20440;
top: -10px;
}
.left .content p {
text-align: justify;
}
.left .content .social {
margin: 20px 0 0 0;
}
.left .content .social a {
padding: 0 2px;
}
.left .content .social a span {
text-decoration: none;
color: #fefdff;
}
.left .content .social a span {
height: 40px;
width: 40px;
background: #171718;
line-height: 40px;
text-align: center;
font-size: 18px;
border-radius: 5px;
transition: .7s;
}
.left .content .social a span:hover {
background: #1fceab;
color: #fefdff;
transition: .7s;
}
.center .content .fas {
font-size: 1.4375rem;
background: #171718;
height: 45px;
width: 45px;
line-height: 45px;
text-align: center;
border-radius: 50%;
transition: 0.7s;
cursor: pointer;
}
.center .content .fas:hover {
background: #c20440;
transition: .7s;
}
.center .content .text {
font-size: 1.0625rem;
font-weight: 500;
padding-left: 10px;
}
.center .content .phone {
margin: 10px 0;
}
.right form .text {
font-size: 1.0625rem;
margin-bottom: 2px;
color: #fefdff;
}
.right form .msg {
margin-top: 10px;
}
.right form input, 
.right form textarea {
width: 100%;
font-size: 1rem;
background: #171718;
padding-left: 10px;
border: 1px solid #222222;
color: #fefdff;
font-family: 'JetBrains Mono', monospace;
}
.right form input:hover, 
.right form textarea:hover {
outline-color: #1fceab;
}
.right form input {
height: 35px;
}
.right form .btn {
margin-top: 10px;
}
.right form .btn button {
height: 30px;
align-items: center;
width: 100%;
border: none;
outline: none;
background: #1fceab;
font-size: 1.0625rem;
cursor: pointer;
color: var(--clr-white);
font-weight: 500;
transition: .3s;
}
.right form .btn button:hover{
background: #c20440;
}
.bottom center {
padding: 5px;
font-size: 0.9375rem;
background: #171718;
}
.bottom center span {
color: var(--clr-white);
}
.bottom center a{
color: #1fceab;
text-shadow: -1px -1px #c20440;
text-decoration: none;  
}
.bottom center a:hover {
text-decoration: underline;
}
@media screen and (max-width: 900px) {
    footer {
        position: relative;
        bottom: 0px;
        font-size: smaller;
        font-size: .8rem;
    }
    .main-content{
        flex-wrap: wrap;
        flex-direction: column;
    }
    .main-content .box {
        margin: 5px 0;
    }
    .center .content .fas {
        font-size: 1rem;
        background: #171718;
        height: 30px;
        width: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        transition: 0.7s;
        cursor: pointer;
    }
    .box h2 {
        font-size: 1.3rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    .center .content .text {
        font-size: .8rem;
        font-weight: 500;
        padding-left: 10px;
    }
    .right form input, 
    .right form textarea {
        width: 80%;
        font-size: .7rem;
    }
    .right form .text {
        font-size: .8rem;
        margin-bottom: 2px;
        color: #fefdff;
    }
    .left .content .social a span {
        height: 45px;
        width: 45px;
        background: #171718;
        line-height: 45px;
        text-align: center;
        font-size: 20px;
        border-radius: 5px;
        transition: .7s;
    }
}

html {
scroll-behavior: smooth;
}     
`

class HomePage extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this._shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
        <style>
            ${style}
        </style>

        <div class="container-all">
            <section class="master-header">
                <header>
                    <a href="#"><img src="./img/Logo.png" class="logo" alt="logo"></a>
                    <input type="checkbox" id="check">
                    <label for="check" class="check-btn">
                        <i class="fa fa-bars"></i>
                    </label>
                    <ul>
                        <li><a href="#" class="cool-link">Home</a></li>
                        <li><a href="#" class="cool-link">About Us</a></li>
                        <li><a href="#" class="cool-link">Explore</a></li>
                        <li><a href="#section@" class="cool-link">Feedback</a></li>
                    </ul>
                </header>
            </section>

            <main>
                <section class="slider-container">
                    <div class="slider">
                        <div class="slide active">
                            <img src="./img/Welcome_.png" alt="img">
                            <div class="content">
                                <h2>Welcome to <span>Queazy</span></h2>
                                <p>Modern Quiz maker for everyone</p>
                                <button><a class="redirect">Login</a></button>
                                <button><a class="redirect2">Sign up</a></button>
                            </div>
                        </div>
                        <div class="slide">
                            <img src="./img/Easy_.png" alt="img">
                            <div class="content">
                                <h2>Queazy is <span>Easy</span></h2>
                                <p>Queazy offer you a simple tool to create and share quizzes</p>
                                <button><a class="redirect">Login</a></button>
                                <button><a class="redirect2">Sign up</a></button>
                            </div>
                        </div>
                        <div class="slide">
                            <img src="./img/Fun_.png" alt="img">
                            <div class="content">
                                <h2>Queazy is <span>Fun</span></h2>
                                <p>Queazy make your quizzes look funnier and friendlier</p>
                                <button><a class="redirect">Login</a></button>
                                <button><a class="redirect2">Sign up</a></button>
                            </div>
                        </div>
                        <div class="slide">
                            <img src="./img/Free_.png" alt="img">
                            <div class="content">
                                <h2>Queazy is <span>Free</span></h2>
                                <p>Queazy is totally free for everyone</p>
                                <button><a class="redirect">Login</a></button>
                                <button><a class="redirect2">Sign up</a></button>
                            </div>
                        </div>
                        <div class="navigation">
                            <div class="btn active"></div>
                            <div class="btn"></div>
                            <div class="btn"></div>
                            <div class="btn"></div>
                        </div>
                    </div>
                </section>
            </main>
        
            <footer>
                <div class="main-content" id="section@">
                    <div class="left box">
                        <h2>What is Queazy?</h2>
                        <div class="content">
                            <p>Queazy (Quiz + easy) is a website providing a quiz maker for everyone. With the simplicity, the playfulness Queazy will give you a chance to witness unique experience making quizzes</p>
                            <div class="social">
                                <a href="https://www.facebook.com/Queazycom-101271185240634"><span class="fab fa-facebook-f" ></span></a>
                                <a href=""><span class="fab fa-twitter" ></span></a>
                                <a href=""><span class="fab fa-instagram" ></span></a>
                            </div>
                        </div>
                    </div>
                    <div class="center box">
                        <h2>Address</h2>
                        <div class="content">
                            <div class="place">
                                <span class="fas fa-map-marker-alt"></span>
                                <span class="text">22 Thành Công, Hà Nội, Việt Nam</span>
                            </div>
                            <div class="phone">
                                <span class="fas fa-phone-alt"></span>
                                <span class="text">+84-918802002</span>
                            </div>
                            <div class="email">
                                <span class="fas fa-envelope"></span>
                                <span class="text">queazy.mindx@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    <div class="right box">
                        <h2>Feedback</h2>
                        <div class="content">
                            <form action="#">
                                <div class="email">
                                    <div class="text">Email *</div>
                                    <input type="email" required>
                                </div>
                                <div class="msg">
                                    <div class="text">Message *</div>
                                    <textarea cols="25" rows="2.5" required></textarea>
                                </div>
                                <div class="btn">
                                    <button type="submit">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <center>
                        <span class="credit">Created By <a href="index.html">Queazy</a> | </span>
                        <span class="far fa-copyright"></span><span> 2020 All rights reserved.</span>
                    </center>
                </div>
            </footer>
        </div>
        `
        var slides = this._shadowRoot.querySelectorAll('.slider-container .slider .slide');
        var btns = this._shadowRoot.querySelectorAll('.navigation .btn');
        let currentSlide = 1;

        var manualNav = function(manual) {
            slides.forEach((slide) => {
                slide.classList.remove('active');

                btns.forEach((btn) => {
                    btn.classList.remove('active');
                })
            })
            slides[manual].classList.add('active');
            btns[manual].classList.add('active');
        }

        btns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                manualNav(i);
                currentSlide = 1
            })
        })
        this._shadowRoot.querySelectorAll('.redirect').forEach(btn => {
            btn.addEventListener('click', () => {
                router.navigate('login-screen');
            })
        })
        this._shadowRoot.querySelectorAll('.redirect2').forEach(btn => {
            btn.addEventListener('click', () => {
                router.navigate('signup-screen');
            })
        })
    }

}

window.customElements.define("homepage-screen", HomePage)