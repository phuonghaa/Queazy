export default class PreviewColumn extends HTMLElement {
    constructor() {
        super();
        this._shadowDom = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.previewItemCount = this.getAttribute('preview-item-count') || '1';
        this._shadowDom.innerHTML = `
            ${style}
            <div class="preview-column">
                <div class="preview-item-list">
                    <preview-item count=${this.previewItemCount}></preview-item>
                </div>
                <add-question-btn></add-question-btn>
            </div>
        `

        const newQuestionBtn = this._shadowDom.querySelector('add-question-btn');
        const previewItemList = this._shadowDom.querySelector('.preview-item-list');

        newQuestionBtn.addEventListener('click', (e) => {
            const previewItem = document.createElement('preview-item');
            previewItem.setAttribute('count', ++this.previewItemCount);
            previewItemList.appendChild(previewItem);
            previewItem.displayQuestion();
            newQuestionBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        })
    }
}

window.customElements.define('preview-column', PreviewColumn)

const style = `
<style>
    .preview-column{
        position: fixed;
        overflow-y: auto;
        width: 280px;
        height: 100vh;
        background-color:#252525;
        opacity: 0.8;
        color: #fff;
        font-family: 'JetBrains Mono', monospace;
        height: calc(100% - 100px);
        flex-direction: column;
    }

    .preview-item-list{
        display: flex;
        flex-direction: column;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }

    @media only screen and (max-width: 817px){
        .preview-item-list{
            flex-direction: row;
        }
        .preview-column{
            width: 100%;
            height: 120px;
            bottom: 0;
            overflow-x: auto;
            display: flex;
            flex-direction: row;
        }
        /* width */
        ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }  
    }
</style>
`