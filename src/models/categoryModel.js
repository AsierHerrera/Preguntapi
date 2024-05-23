import mongoose from "mongoose";

const categorieschema  = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    count_questions: {
        type: Number,
        required: true
    },
    link : {
        type: String,
        required: true,
        unique: true
    },
})

const categoryModel = mongoose.model("Category",categorieschema);

export default categoryModel;