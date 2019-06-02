const db = require('./mongo');

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
}
module.exports = new QuizList();