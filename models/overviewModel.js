import mongoose from "mongoose";

const overviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    instituteName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    vision: {
      type: String,
      required: true,
    },

    mission: {
      type: String,
      required: true,
    },

    programs: [
      {
        name: {
          type: String,
          required: true,
        },

        description: {
          type: String,
        },

        image: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Overview = mongoose.model("Overview", overviewSchema);

export default Overview;