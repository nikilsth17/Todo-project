import mongoose from "mongoose";

export const todoSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    date:{
        type:String,
        required:true,
        
    },
    userId: {
        type: mongoose.ObjectId,
        ref: 'User', // Assuming your User model is named 'User'
        required: true,
    },
},
{
    timestamps:true,
}
);

export const Todo= mongoose.model("Todo",todoSchema);