const express = require("express");
const cors = require("cors");
const multer = require("multer");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public"));

// Set up multer for file uploads (storage in memory)
const upload = multer({ storage: multer.memoryStorage() });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Handle file upload
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
