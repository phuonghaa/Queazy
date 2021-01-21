const style = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
    #create-btn{
        position: fixed;
        color: #fff;
        font-size: 60px;
        left: 90vw;
        top: 80vh;
        transition: .5s;
    }
    #create-btn:hover{
        cursor: pointer;
        text-shadow: 4px 4px 0 #c20440,-4px -4px 0 #1fceab;
        transition: .5s;
    }
    @media only screen and (max-width: 786px){
        #create-btn{
            font-size: 50px;
            left: 80vw;
        }
    }
</style>
`
class CreatePlusBtn extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this._shadowDom.innerHTML = `
        ${style}
        
        <div id="create-btn"> <i class="fa fa-plus-circle"></i> </div>
        `
    }
}

window.customElements.define('create-plus-btn', CreatePlusBtn)