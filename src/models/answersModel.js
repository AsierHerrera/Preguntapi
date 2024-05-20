import mongoose from "mongoose";

const answersSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    is_correct: {
        type: Boolean,
        default: "false"
    },
    question:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'questions'
        }
    ]
});

const answersModel = mongoose.model("answers",answersSchema);

export default answersModel;