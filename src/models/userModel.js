import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    email : {
        type: String,
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role : {
        type:String,
        enum : ["user","admin"],
        default: "user"
    },
    questions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question"
        }
    ]
})

const userModel = mongoose.model("user",userSchema);

export default userModel;