import Scholarship from "../models/scholarshipModel.js";

export const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({
      createdAt: -1,
    });

    res.status(200).json(scholarships);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch scholarships",
      error: error.message,
    });
  }
};

export const addScholarship = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      eligibility,
      documents,
    } = req.body;

    const scholarship = new Scholarship({
      title,
      category,
      description,
      eligibility,
      documents,
    });

    const savedScholarship = await scholarship.save();

    res.status(201).json({
      message: "Scholarship added successfully",
      scholarship: savedScholarship,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add scholarship",
      error: error.message,
    });
  }
};