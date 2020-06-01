const QuestionSchema = require('../model/question.model');

function createQuestion(req, res) {
    const body = req.body;
    var question = new QuestionSchema({
        no: body.no,
        question: body.question.trim(),
        answer: body.answer.trim(),
        option1: body.option1.trim(),
        option2: body.option2.trim(),
        option3: body.option3.trim(),
        userName: req.session.usn.usn.trim()
    });
    question.save(function(err,newObj){
        if (err) {
            res.status(400).json('Error!');
            return
        }
        res.status(200).json('Question Added!');
    });
}

function shuffle(a) {
    for (let i = 3; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function processOptions(quesList){
    let questions = []
    quesList.forEach(question => {
        let temp = {}
        temp['question'] = question.question;
        temp['options'] = shuffle([question.option1, question.option2,question.option3, question.answer])
        temp['answer'] = question.answer
        temp['uploaded'] = question.userName
        questions.push(temp)
    });
    return questions;
}

function readQuestion(req, res) {
    let sesObj = req.session.usn;
    // console.log(sesObj);
    
    if(sesObj.quesList) {
        return res.json(sesObj.quesList[sesObj.question])
    } else {
        QuestionSchema.find(function(err, quesList) {
            if (err) {
                res.json('Error!');
            }
            quesList.splice(Math.floor(Math.random()*16),1)
            sesObj.quesList = processOptions(quesList);
            let temp = sesObj.quesList[0];
            sesObj.answer = temp.answer;
            sesObj.question = 0;
            sesObj.score = 0;
            delete temp.answer;
            temp.no = 1
            res.json(temp);
        });
    }
}

function updateQuestion(req, res) {
    var obj = {};
    const body = req.body;
    if(!isNaN(req.params.no)){
        if (body.question) {
            obj['question'] = body.question;
        }
        if (body.answer) {
            obj['answer'] = body.answer;
        }
        if (body.option1) {
            obj['option1'] = body.option1;
        }
        if (body.option2) {
            obj['option2'] = body.option2;
        }
        if (body.option3) {
            obj['option3'] = body.option3;
        }
        QuestionSchema.findOneAndUpdate({ no: parseInt(req.params.no) }, { $set: obj }, { useFindAndModify: false }, function(err, updatedObj) {
            if (updatedObj) {
                // console.log(updatedObj);
                
                res.status(200).json('Updated');
            }
            else res.status(400).json('Question Not Found!')
        });
    } else {
        res.status(400).json("Empty!");
    }
}

function deleteQuestion(req, res) {
    if(!isNaN(req.params.no)){
        QuestionSchema.findOneAndDelete({ no: parseInt(req.params.no) }, function(err, deletedObj) {
            if (err) {
                return res.json('Error!');
            }
            if (deletedObj) res.json('Deleted!');
            else res.json('Question Not Found!');
        });    
    }
}

module.exports = {
    createQuestion,
    readQuestion,
    updateQuestion,
    deleteQuestion
}