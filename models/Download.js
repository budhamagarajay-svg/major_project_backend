import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema(
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

    date: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    file: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Download = mongoose.model("Download", downloadSchema);

export default Download;