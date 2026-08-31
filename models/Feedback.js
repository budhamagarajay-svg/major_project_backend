import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    feedback: {
      type: String,
      required: true,
      trim: true,
    },

    reply: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Replied"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;