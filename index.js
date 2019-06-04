const quizList = require('./lib/quizList');
const quizDetails = require('./lib/quizDetails');
const quizTake = require('./lib/quizTake');
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(express.json());

app.get('/quiz', quizList.getList);
app.post('/quiz', quizList.createQuiz)
app.delete('/quiz/:id', quizList.deleteQuiz);

app.get('/details/:id', quizDetails.getQuiz);
app.put('/details/:id', quizDetails.addQuestion);
app.delete('/details/:id/:qid', quizDetails.deleteQuestion);

app.get('/take/:id', quizTake.getQuiz);

app.listen(port, () => console.log(`Inquizy app listening on port ${port}!`))