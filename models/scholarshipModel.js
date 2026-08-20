import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    eligibility: {
      type: [String],
      required: true,
    },

    documents: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Scholarship = mongoose.model(
  "Scholarship",
  scholarshipSchema
);

export default Scholarship;