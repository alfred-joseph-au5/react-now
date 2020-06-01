const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let QuestionSchema = new Schema({
    no: { type: Number, required: true },
    question: { type: String, required: true },
    answer: { type: String, required:true},
    option1: { type: String, required:true},
    option2: { type: String, required:true},
    option3: { type: String, required:true},
    userName: { type: String, default: 'Admin'}
    // username: { type: String, required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);