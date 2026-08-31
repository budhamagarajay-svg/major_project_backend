import mongoose from "mongoose";

const digitalLearningSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    program: {
      type: String,
      default: "",
    },
    semester: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "Online Course",
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const DigitalLearning = mongoose.model(
  "DigitalLearning",
  digitalLearningSchema
);

export default DigitalLearning;