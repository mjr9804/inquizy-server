const db = require('./mongo');
const { ObjectID } = require('mongodb');
const oid = ObjectID.createFromHexString;

class QuizList {
    constructor() { }
    getList(req, res) {
        db.connect(async db => {
            const col = await db.collection('quiz');
            const docs = await col.find({}).toArray();
            res.send(docs)
        });
    };
    createQuiz(req, res) {
        db.connect(async db => {
            const col = await db.collection('quiz');
            await col.insertOne({ name: req.body.name });
            res.send('', 201);
        })
    }
    deleteQuiz(req, res) {
        db.connect(async db => {
            const col = await db.collection('quiz');
            await col.deleteOne({ _id: oid(req.params.id) });
            res.send({ result: 'Quiz Deleted'});
        });
    }
}
module.exports = new QuizList();