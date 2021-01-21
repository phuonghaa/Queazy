import { addQuizDocument } from "../utils.js";
import Answer from "./Answer.js"

export default class Quiz {
    id;
    content;
    answers;

    /**
     * 
     * @param {String} content 
     */
    // create a new quiz from content
    constructor(content) {
        this.content = content;
        this.answers = [];
    }

    /**
     * 
     * @param {Answer} answer 
     */
    // add an answer to this quiz
    addAnswer(answer) {
        this.answers.push(answer);
    }

    // get the quiz's correct answer
    getCorrectAnswer() {
        return this.answers.find(answer => answer.isCorrect);
    }

    /**
     * 
     * @param {Answer} userAnswer
     */
    // check if user's answer is correct or not
    checkAnswer(userAnswer) {
        return userAnswer.isCorrect;
    }

    // push a quiz to database
    async pushToFireBase() {
        const res = await addQuizDocument(this);
        return res.id;
    }

    // parse a quiz document back to object
    static parseDocument(quizDocument) {
        const quiz = new Quiz(quizDocument.content);
        quiz.id = quizDocument.id;
        const answers = quizDocument.answers;
        for (const answer of answers) {
            quiz.addAnswer(Answer.parseDocument(answer));
        }
        return quiz;
    }
}