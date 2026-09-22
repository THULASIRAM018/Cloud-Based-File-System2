<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const { configDotenv } = require('dotenv');
const db = require('./db');

configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "https://file-processing-system.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const router = require('./Routes/AuthRoutes');
const fileRouter = require('./Routes/FileRoutes');
const folderRouter = require('./Routes/FolderRoutes');
const starredRouter = require('./Routes/StarredRoutes');

app.use('/', router);
app.use('/file', fileRouter);
app.use('/folder', folderRouter);
app.use('/starred', starredRouter);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});
=======
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { configDotenv } = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

// Load environment variables
configDotenv();

// Middleware
app.use(cors({
  origin: [
    "https://cloud-based-file-system2.vercel.app",
    "https://cloud-based-file-system2-g1tr.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.send("Cloud File System API running 🚀");
});

// Routes
app.use("/api/auth", require("./Routes/AuthRoutes"));
app.use("/api/file", require("./Routes/FileRoutes"));
app.use("/api/folder", require("./Routes/FolderRoutes"));
app.use("/api/starred", require("./Routes/StarredRoutes"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Start server inside async function
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

startServer();
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
