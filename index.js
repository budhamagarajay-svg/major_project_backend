import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import morgan from "morgan";

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import newsRoute from "./routes/newsRoute.js";
import noticeRoute from "./routes/noticeRoute.js";
import eventRoute from "./routes/eventRoute.js";
import downloadRoute from "./routes/downloadRoute.js";
import galaryRoute from "./routes/galleryRoute.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import adminRoute from "./routes/adminRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import facultyRoute from "./routes/facultyRoute.js";
import studentPortalRoute from "./routes/studentPortalRoutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use(
  fileUpload({
    limits: {},
    abortOnLimit: true,
    createParentPath: true,
    useTempFiles: false,
    safeFileNames: true,
    preserveExtension: true,
  })
);

app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/news", newsRoute);
app.use("/api/notices", noticeRoute);
app.use("/api/events", eventRoute);
app.use("/api/downloads", downloadRoute);
app.use("/api/gallery", galaryRoute);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/faculty", facultyRoute);
app.use("/api/student-portal", studentPortalRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Running Successfully",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(port, () => {
      console.log(`Server Running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed");
    console.log(error.message);
  });