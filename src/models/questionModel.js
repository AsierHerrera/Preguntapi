import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    answer_a: { type: String, required: false },
    answer_b: { type: String, required: false },
    answer_c: { type: String, required: false },
    answer_d: { type: String, required: false },
}, { _id: false });

const questionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
        unique: false
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answers: {
        type: answerSchema,
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["UnAcepted", "Acepted"],
        default: "UnAcepted"
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
}, { versionKey: false });

const questionModel = mongoose.model("Question", questionSchema);

export default questionModel;
