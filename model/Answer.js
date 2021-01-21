export default class Answer{
    content;
    isCorrect;

    /**
     * 
     * @param {String} content 
     * @param {Boolean} isCorrect 
     */
    // create a new answer from content and true/false choices
    constructor(content, isCorrect){
        this.content = content;
        this.isCorrect = isCorrect;
    }

    // parse an answer document back to object
    static parseDocument(answerDocument){
        return new Answer(answerDocument.content, answerDocument.isCorrect);
    }
}