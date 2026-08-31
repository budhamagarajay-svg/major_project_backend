import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: String,
      required: true,
      trim: true,
    },

    rollNumber: {
      type: String,
      required: true,
      trim: true,
    },

    symbolNumber: {
      type: String,
      required: true,
      trim: true,
    },

    program: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: String,
      required: true,
      trim: true,
    },

    gpa: {
      type: Number,
      required: true,
      min: 0,
      max: 4,
    },

    status: {
      type: String,
      enum: ["Pass", "Fail", "Pending"],
      default: "Pass",
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;