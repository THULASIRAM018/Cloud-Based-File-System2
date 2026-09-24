const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { configDotenv } = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

// Load environment variables
configDotenv();
const mongoUri = process.env.MONGO_CONN || process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
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
    if (!mongoUri) {
      throw new Error("Missing MongoDB connection string. Set MONGO_CONN or MONGO_URI in Backend/.env");
    }

    await mongoose.connect(mongoUri);
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
