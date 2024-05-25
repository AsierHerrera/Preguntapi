import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    }
}, { versionKey: false });

const scoreModel = mongoose.model("Score", scoreSchema);

export default scoreModel;
