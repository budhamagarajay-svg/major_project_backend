import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },

    dateOfBirth: {
      type: String,
    },

    address: {
      type: String,
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
    },

    rollNumber: {
      type: String,
      trim: true,
    },

    admissionYear: {
      type: String,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;