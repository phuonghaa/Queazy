import Account from "./model/Account.js"
import QuizSet from "./model/QuizSet.js"
import Quiz from "./model/Quiz.js"

const db = firebase.firestore();

/**
 * 
 * @param {String} key 
 * @param {Object} value 
 */
export function writeToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 
 * @param {String} key
 */
export function getItemFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function getDataFromDoc(doc) {
    const data = doc.data();
    data.id = doc.id;
    return data;
}

export function getDataFromDocs(docs) {
    return docs.map(getDataFromDoc);
}

/**
 * 
 * @param {String} userName 
 */
export async function getAccountDocByUserName(userName) {
    const res = await db.collection('Accounts').where('userName', '==', userName).get();
    const accounts = getDataFromDocs(res.docs);
    return accounts[0];
}

export async function getQuizSetDocByID(id) {
    const res = await db.collection('QuizSets').doc(id).get();
    const quizSet = getDataFromDoc(res);
    return quizSet;
}

export async function getQuizDocByID(id) {
    const res = await db.collection('Quizs').doc(id).get();
    const quiz = getDataFromDoc(res);
    return quiz;
}

/**
 * 
 * @param {Account} account 
 */
export async function addAccountDocument(account) {
    const accountDoc = {
        userName: account.userName,
        password: CryptoJS.MD5(account.password).toString(CryptoJS.enc.Hex),
        quizCollection: []
    }
    const res = await db.collection('Accounts').add(accountDoc);
    return res;
}

/**
 * 
 * @param {QuizSet} quizSet 
 */
export async function addQuizSetDocument(quizSet) {
    const quizRefList = [];
    const quizPromiseList = [];
    quizSet.quizList.forEach(quiz => quizPromiseList.push(addQuizDocument(quiz)));
    return Promise.all(quizPromiseList).then(async(values) => {
        for (const item of values) {
            quizRefList.push(db.doc('Quizs/' + item.id));
        }
        const quizSetDoc = {
            title: quizSet.title,
            description: quizSet.description,
            recordCount: 0,
            createdDate: quizSet.createdDate.toISOString(),
            highScoreList: [],
            quizList: quizRefList
        }
        const res = await db.collection('QuizSets').add(quizSetDoc);
        return res;
    })
}

/**
 * 
 * @param {Quiz} quiz 
 */
export async function addQuizDocument(quiz) {
    const quizAnswers = [];
    quiz.answers.forEach(answer => {
        quizAnswers.push({
            content: answer.content,
            isCorrect: answer.isCorrect
        })
    })
    const quizDoc = {
        content: quiz.content,
        answers: quizAnswers
    }
    const res = await db.collection('Quizs').add(quizDoc);
    return res;
}


/**
 * 
 * @param {Date} dateStr 
 */
export function convertDate(dateStr) {
    const date = new Date(dateStr)
    const day = validateNiceNumber(date.getDate())
    const month = validateNiceNumber(date.getMonth() + 1)
    const year = date.getFullYear()
    const hour = validateNiceNumber(date.getHours())
    const minutes = validateNiceNumber(date.getMinutes())
    return `${day}/${month}/${year} ${hour}:${minutes}`
}

function validateNiceNumber(number) {
    return (number < 10) ? ('0' + number) : (number)
}

export function sortRank(list) {
    let sortedList = list.sort((player1, player2) => player1.score === player2.score ? player1.timeAchieved - player2.timeAchieved : player2.score - player1.score);
    return sortedList;
}