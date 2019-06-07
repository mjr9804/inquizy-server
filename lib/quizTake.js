const db = require('./mongo');
const crypto = require('crypto');
const { ObjectID } = require('mongodb');
const oid = ObjectID.createFromHexString;

class QuizTake {
    constructor() { }

    getQuiz(req, res) {
        db.connect(async db => {
            const col = await db.collection('quiz');
            const doc = await col.findOne({ _id: oid(req.params.id) });
            let questions = doc.questions.sort(function (a, b) { return 0.5 - Math.random() });
            if (questions.length > 100) {
                questions = questions.slice(0, 100);
            }
            const parsedQuestions = questions.map(q => {
                let answers = [q.correct, ...q.incorrect];
                answers = answers.sort(function (a, b) { return 0.5 - Math.random() });
                const correct = crypto.createHash('md5').update(q.correct).digest('hex');
                return { question: q.question, answers, correct };
            });
            const quiz = {
                name: doc.name,
                questions: parsedQuestions,
            }
            res.send(quiz);
        });
    }
}
module.exports = new QuizTake();