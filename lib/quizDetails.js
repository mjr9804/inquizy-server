const db = require('./mongo');
const { ObjectID } = require('mongodb');
const oid = ObjectID.createFromHexString;

class QuizDetails {
    constructor() { }
    getQuiz(req, res) {
        db.connect(async db => {
            const col = await db.collection('quiz');
            const doc = await col.findOne({ _id: oid(req.params.id) });
            res.send(doc);
        });
    };

    addQuestion(req, res) {
        db.connect(async db => {
            const col = await db.collection('quiz');
            const q = {
                _id: new ObjectID(),
                ...req.body
            }
            const doc = await col.updateOne(
                { _id: oid(req.params.id) },
                {
                    $push: {
                        questions: q,
                    }
                }
            );
            res.send('Question Added');
        });
    };
}
module.exports = new QuizDetails();