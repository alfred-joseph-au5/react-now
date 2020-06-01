function evalAndFetch(req, res) {
    sesObj = req.session.usn
    if(sesObj) {
        if(sesObj.question!=15) {
            // console.log(req.body.answer);
            if(sesObj.answer === req.body.answer){
                sesObj.quesList[sesObj.question]['flag']=true
                sesObj.score++;
                // console.log(sesObj.score);
            } else sesObj.quesList[sesObj.question]['flag']=false
            sesObj.question++;
            if(sesObj.question == 15){
            let temp = {
                score : sesObj.score,
                questions: sesObj.quesList
            }
            // console.log('Should Exit here at 15!');
            res.json(temp)
            } else {
                // console.log('Should Exit here!');
                let temp = sesObj.quesList[sesObj.question]
                sesObj.answer = temp.answer
                temp.no = sesObj.question + 1
                delete temp.answer
                res.json(temp);
            }
        } else {
            res.status(400).end();
        }
    }
}

module.exports = {
    evalAndFetch
}