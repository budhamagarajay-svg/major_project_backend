import mongoose from "mongoose";
const feedbackSchema =new mongoose.Schema(
    {
        feedback:{
            type:String,
            required:true,
            trim:true,
        },
    },
    {
        timestamps:true,
    }
);
const Feedback = mongoose.model("Feedback",feedbackSchema);
export default Feedback;