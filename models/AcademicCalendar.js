import mongoose from "mongoose";

const academicCalendarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: String,
      default: "",
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "Exam",
        "Admission",
        "Holiday",
        "Class",
        "Result",
        "Event",
        "Other",
      ],
      default: "Exam",
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const AcademicCalendar = mongoose.model(
  "AcademicCalendar",
  academicCalendarSchema
);

export default AcademicCalendar;