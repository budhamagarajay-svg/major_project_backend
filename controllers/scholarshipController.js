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

    if (!title || !category || !description) {
      return res.status(400).json({
        message: "Title, category and description are required",
      });
    }

    if (!Array.isArray(eligibility) || eligibility.length === 0) {
      return res.status(400).json({
        message: "Eligibility is required",
      });
    }

    if (!Array.isArray(documents) || documents.length === 0) {
      return res.status(400).json({
        message: "Documents are required",
      });
    }

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

export const updateScholarship = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      category,
      description,
      eligibility,
      documents,
    } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({
        message: "Title, category and description are required",
      });
    }

    if (!Array.isArray(eligibility) || eligibility.length === 0) {
      return res.status(400).json({
        message: "Eligibility is required",
      });
    }

    if (!Array.isArray(documents) || documents.length === 0) {
      return res.status(400).json({
        message: "Documents are required",
      });
    }

    const updatedScholarship =
      await Scholarship.findByIdAndUpdate(
        id,
        {
          title,
          category,
          description,
          eligibility,
          documents,
        },
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

    if (!updatedScholarship) {
      return res.status(404).json({
        message: "Scholarship not found",
      });
    }

    res.status(200).json({
      message: "Scholarship updated successfully",
      scholarship: updatedScholarship,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update scholarship",
      error: error.message,
    });
  }
};

export const deleteScholarship = async (req, res) => {
  try {
    const { id } = req.params;

    const scholarship = await Scholarship.findById(id);

    if (!scholarship) {
      return res.status(404).json({
        message: "Scholarship not found",
      });
    }

    await Scholarship.findByIdAndDelete(id);

    res.status(200).json({
      message: "Scholarship deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete scholarship",
      error: error.message,
    });
  }
};