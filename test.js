// import Account from "./model/Account.js";
// import Answer from "./model/Answer.js";
// import Quiz from "./model/Quiz.js";
// import QuizSet from "./model/QuizSet.js";
// import { getAccountDocByUserName } from "./utils.js";

// on registration
// const admin = new Account("admin", "123456");

// to upload new account to database
// admin.pushToFireBase()

// on login
// getAccountDocByUserName("admin").then(async(doc) => {
// ...
// check password here before redirecting
// ... 

// on redirecting
// use this static method "parseDocument()" to parse account document on database back to Account object
// WARNING: this "parseDocument()" method returns a promise => need ".then()" or "async"/"await" keyword
// const account = await Account.parseDocument(doc);
// console.log(account);
// })

// on creating a new Quiz Set
// const quizSet = new QuizSet("Math", "Here is a description");

// on creating a new Quiz
// const quiz1 = new Quiz("3 + 2 = ?");

// on adding an answer
// quiz1.addAnswer(new Answer("5", true));
// quiz1.addAnswer(new Answer("6", false));
// quiz1.addAnswer(new Answer("7", false));
// quiz1.addAnswer(new Answer("8", false));
// similarly
// const quiz2 = new Quiz("2 x 5 = ?");
// quiz2.addAnswer(new Answer("1", false));
// quiz2.addAnswer(new Answer("2", false));
// quiz2.addAnswer(new Answer("5", false));
// quiz2.addAnswer(new Answer("10", true));

// after finishing quizzes creation, add created quizzes to quizSet
// quizSet.addQuiz(quiz1);
// quizSet.addQuiz(quiz2);

// after finishing quizSet creation, add created quizSet to account
// "addQuizSet()" method will also update database
// admin.addQuizSet(quizSet);

// to delete a quizSet
// "deleteQuizSet()" method will also update database
// const quizSetId = ...?
// admin.deleteQuizSet(quizSetId);

// ---------------------------------
// ---------------------------------
// On user finishing playing quizzes
// ---------------------------------
// ---------------------------------

// in order to add new high score to quizSet
// "addNewRecord()" method will also update database
// const player = ...?
// const score = ...?
// quizSet.addNewRecord(player, score)

// const quizSet = new QuizSet('Technology', 'Another description');

// const quiz1 = new Quiz("Why is Big Data important?");
// quiz1.addAnswer(new Answer("Because it is structured", false));
// quiz1.addAnswer(new Answer("Because it may be analyzed to reveal patterns and trends", true));
// quiz1.addAnswer(new Answer("Because of its complexity", false));
// quiz1.addAnswer(new Answer("Because of its size", false));

// const quiz2 = new Quiz("Which computer language is the most widely used?");
// quiz2.addAnswer(new Answer("C#", false));
// quiz2.addAnswer(new Answer("Swift", false));
// quiz2.addAnswer(new Answer("PHP", false));
// quiz2.addAnswer(new Answer("Java", true));

// const quiz3 = new Quiz("What was the first cross-platform PDF software?");
// quiz3.addAnswer(new Answer("Adobe Acrobat", false));
// quiz3.addAnswer(new Answer("Foxit PhantomPDF", false));
// quiz3.addAnswer(new Answer("Nitro Pro", false));
// quiz3.addAnswer(new Answer("Able2Extract Professional", true));

// quizSet.addQuiz(quiz1);
// quizSet.addQuiz(quiz2);
// quizSet.addQuiz(quiz3);

// getAccountDocByUserName("admin").then(async(doc) => {
//     const account = await Account.parseDocument(doc);
//     account.addQuizSet(quizSet);
// })