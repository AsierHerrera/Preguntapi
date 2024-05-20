import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    difficulty: {
        type:String,
    },
    status: {
        type:String,
        enum: ["UnAcepted","Acepted"],
        default: "UnAcepted"
    },
})

const questionModel = mongoose.model("questions",questionSchema);

export default questionModel;