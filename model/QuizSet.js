import { addQuizSetDocument, getDataFromDoc } from "../utils.js";
import Quiz from "./Quiz.js"

export default class QuizSet {
    id;
    title;
    description;
    recordCount;
    quizList;
    highScoreList;
    createdDate;

    /**
     * 
     * @param {String} title 
     * @param {String} description 
     */
    // create a new quiz set from title and description
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.recordCount = 0;
        this.quizList = [];
        this.highScoreList = [];
        this.createdDate = new Date();
    }

    /**
     * 
     * @param {Quiz} quiz 
     */
    // add a new quiz to this quiz set
    addQuiz(quiz) {
        this.quizList.push(quiz);
    }

    /**
     * 
     * @param {String} quizId 
     */
    // delete a quiz then update database
    async deleteQuiz(quizId) {
        const index = this.quizList.findIndex(quiz => quiz.id === quizId);

        if (index !== -1) {
            this.quizList.splice(index, 1);

            await db.collection('Quizs').doc(quizId).delete();
            await db.collection('QuizSets').doc(this.id).update({
                quizList: firebase.firestore.FieldValue.arrayRemove(db.doc('Quizs/' + quizId))
            })

            console.log(`Quiz with id ${quizId} is deleted`);
        } else console.log(`Quiz with id ${quizId} is unavailable`);
    }

    // delete all quizzes from this quizset then update database
    async deleteAllQuizzes() {
        this.quizList.forEach(quiz => this.deleteQuiz(quiz.id));
        for (const quiz of this.quizList) {
            await this.deleteQuiz(quiz.id);
        }
    }

    /**
     * 
     * @param {String} player
     * @param {Number} score 
     */
    // add new record to this quiz set object and update database
    // this method also sorts out a maximum of 5 highest score and update database
    addNewRecord(player, score) {
        const quizSetDoc = db.collection('QuizSets').doc(this.id);
        const newRecord = {
                'player': player,
                'score': score,
                'timeAchieved': new Date().toISOString()
            }
            // If highscoreList has not reached maximum, just push newHighScore
        if (this.highScoreList.length < MAX_HIGHSCORE_LIST) {
            this.highScoreList.push(newRecord);
            quizSetDoc.update({
                recordCount: ++this.recordCount,
                highScoreList: firebase.firestore.FieldValue.arrayUnion(newRecord)
            })
        } else {
            // else if highScoreList is full, check if newRecord beats any lowest highscore and replace it if possible
            let minHighScore = this.highScoreList.reduce((prev, cur) => prev.score < cur.score ? prev : cur);
            if (score > minHighScore.score) {
                quizSetDoc.update({
                    highScoreList: firebase.firestore.FieldValue.arrayRemove({
                        'player': minHighScore.player,
                        'score': minHighScore.score,
                        'timeAchieved': minHighScore.timeAchieved.toISOString()
                    })
                })
                quizSetDoc.update({
                    recordCount: ++this.recordCount,
                    highScoreList: firebase.firestore.FieldValue.arrayUnion(newRecord)
                })
                minHighScore = newRecord;
            }
            // else just update the number of records
            else quizSetDoc.update({
                recordCount: ++this.recordCount
            })
        }
    }

    // push a quiz set to database 
    async pushToFireBase() {
        const res = await addQuizSetDocument(this);
        return res.id;
    }

    // parse a quiz set document and all of its attributes back to object
    static async parseDocument(quizSetDocument) {
        const quizSet = new QuizSet(quizSetDocument.title, quizSetDocument.description);
        quizSet.id = quizSetDocument.id;
        quizSet.recordCount = quizSetDocument.recordCount;
        quizSet.createdDate = new Date(quizSetDocument.createdDate);

        const highScoreList = quizSetDocument.highScoreList;
        for (const highScore of highScoreList) {
            quizSet.highScoreList.push({
                'player': highScore.player,
                'score': highScore.score,
                'timeAchieved': new Date(highScore.timeAchieved)
            });
        }

        const quizRefList = quizSetDocument.quizList;
        for (const quizRef of quizRefList) {
            const quizDoc = await quizRef.get();
            const data = getDataFromDoc(quizDoc);
            quizSet.quizList.push(Quiz.parseDocument(data));
        }
        return quizSet;
    }
}

const MAX_HIGHSCORE_LIST = 10;
const db = firebase.firestore();