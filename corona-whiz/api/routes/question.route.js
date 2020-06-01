const express = require('express');
const router = express.Router();

//controllers
const QuestionController = require('../controller/question.controller');

// router.get('/', QuestionController.readUsers);

router.post('/question', QuestionController.createQuestion);

router.get('/question', QuestionController.readQuestion);

router.put('/question/:no', QuestionController.updateQuestion);

router.delete('/question/:no', QuestionController.deleteQuestion);

module.exports = router;