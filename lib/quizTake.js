const db = require('./mongo');
const { ObjectID } = require('mongodb');
const oid = ObjectID.createFromHexString;

class QuizTake {
    constructor() { }
    getQuestion(req, res) {
        db.connect(async db => {
            const col = await db.collection('quiz');
            const doc = await col.findOne({ _id: oid(req.params.id) });
            const question = doc.questions[req.query.q - 1 || 0];
            let answers = [question.correct, ...question.incorrect];
            answers = answers.sort(function (a, b) { return 0.5 - Math.random() });
            const q = {
                answers,
                question: question.question,
            }
            res.send(q);
        });
    };

    checkAnswer(req, res) {
        db.connect(async db => {
            const col = await db.collection('quiz');
            const doc = await col.findOne({ _id: oid(req.params.id) });
            const question = doc.questions[req.query.q - 1 || 0];
            if (question.correct === req.body.answer) {
                res.send({ result: 'correct' });
            } else {
                res.send({ result: 'incorrect' });
            }
        });
    };
}
module.exports = new QuizTake();