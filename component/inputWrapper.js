const style = `
 .error{
    color: #1fceab;
    font-family: 'JetBrains Mono', monospace;
 }

.input-wrapper{
    margin-bottom: 10px;
    transition: .5s;
}
.input-wrapper input {
    padding: 10px 0;
    margin-bottom: 35px;
}

.input-wrapper input {
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


.input-wrapper {
    position: relative;
}

.input-wrapper label {
    position: relative;
    font-size: 30px;
    top: -110px;
    left: 0;
    color: #5c5c5c;
    transition: .5s;
    pointer-events: none;
    font-family: 'JetBrains Mono', monospace;
}

.input-wrapper input:focus ~ .placeholder
{
    top: -110px;
    left: 0;
    color: #c20440;
    font-size: 25px;
    font-weight: bold;
}

.input-wrapper input:focus
{
    border-bottom: 2px solid #c20440;
}

.input-wrapper .error {
    color: #EE1D52;
    font-size: 1rem;
    padding: 10px;
}

@media (max-width: 1000px) {
    .input-wrapper{
        margin-bottom: 1px;
    }
    .input-wrapper input {
        padding: 10px 0;
        margin-bottom: 35px;
    }
    
    .input-wrapper input {
        font-size: 1.2rem;
    }
    
    .input-wrapper label {
        font-size: 20px;
        top: -100px;
        transition: .5s;
    }
    
    .input-wrapper input:focus ~ .placeholder
    {
        top: -100px;
        font-size: 18px;
    }
    
    .input-wrapper .error {
        font-size: .8rem;
        padding: 8px;
    }
}

@media (max-width: 700px) {
    .input-wrapper{
        margin-bottom: -10px;
        transition: .5s;
    }
    .input-wrapper input {
        padding: 7px 0;
        margin-bottom: 35px;
    }
    
    .input-wrapper input {
        font-size: 1rem;
    }
    
    .input-wrapper label {
        font-size: 18px;
        top: -100px;
        transition: .5s;
    }
    
    .input-wrapper input:focus ~ .placeholder
    {
        top: -100px;
        font-size: 16px;
    }
    
    .input-wrapper .error {
        font-size: .8rem;
        padding: 8px;
    }
}
@media (max-width: 500px) {
    .input-wrapper{
        margin-bottom: -10px;
        transition: .5s;
    }
    .input-wrapper input {
        padding: 7px 0;
        margin-bottom: 35px;
    }
    
    .input-wrapper input {
        font-size: .8rem;
    }
    
    .input-wrapper label {
        font-size: 17px;
        top: -87px;
        transition: .5s;
    }
    
    .input-wrapper input:focus ~ .placeholder
    {
        top: -91px;
        font-size: 15px;
    }
    
    .input-wrapper .error {
        font-size: .62rem;
        padding: 8px;
    }
}

`
class InputWrapper extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({
            mode: 'open'
        })
    }
    connectedCallback() {
        this.type = this.getAttribute('type')
        this.placeholder = this.getAttribute('placeholder')
        this.error = this.getAttribute('error') || ""
        this._shadowRoot.innerHTML = `
    <style>
     ${style}
    </style>

     <div class="input-wrapper">
        <input id="input-main" type="${this.type}">
        <label class="placeholder">${this.placeholder}</label>
        <label class="error">${this.error}</label>
    </div>
        
    `
    }
    static get observedAttributes() {
        return ['error']
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'error') {
            this._shadowRoot.querySelector('.error').innerHTML = newValue
        }
    }
    get value() {
        const value = this._shadowRoot.getElementById('input-main').value
        return value
    }
}
window.customElements.define('input-wrapper', InputWrapper)