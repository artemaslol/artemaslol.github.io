const express = require('express');
const multer = require('multer'); // For handling file uploads
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Example database (replace with your actual database integration)
let userFiles = {};

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const username = req.body.username; // Assuming username is sent along with the file

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  // Store file information in database or memory
  const filePath = path.join(__dirname, file.path); // Path to uploaded file
  const fileData = fs.readFileSync(filePath); // Read file content
  userFiles[username] = {
    filename: file.originalname,
    data: fileData,
  };

  // Return success response
  res.send('File uploaded successfully');
});

// Handle file retrieval
app.get('/files/:username', (req, res) => {
  const username = req.params.username;

  if (!userFiles[username]) {
    return res.status(404).send('User files not found');
  }

  const fileData = userFiles[username].data;
  const filename = userFiles[username].filename;

  // Serve file content
  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-type', 'application/octet-stream');
  res.send(fileData);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
