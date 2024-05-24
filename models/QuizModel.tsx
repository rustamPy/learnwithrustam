import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
    question: String,
    answers: Array<String>,
    correctAnswer: Array<String>,
    level: String,
    type: String,
});

export const QuizModel = mongoose.model('questions', QuizSchema);