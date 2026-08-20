import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    file: {
        type: String
    },
    status: {
        type: String,
        default: "active"
    }
}, {
    timestamps: true
});

export default mongoose.model("Notice", noticeSchema);