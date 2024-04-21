const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');

const fileRoute = express.Router();
const upload = multer({ dest: 'uploads/' });

fileRoute.get('/', (req, res) => {
  try {
    const { originalname, filename, size, mimetype } = req.file;

    res.json({ message: 'File uploaded successfully', filename });
  } catch (error) {
    console.error('Server Error /file', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

fileRoute.post('/upload', upload.single('file'), (req, res) => {
    try {
      const { originalname, filename, size, mimetype } = req.file;
      fs.renameSync(path.join('uploads/', filename), path.join('uploads/', originalname));
      res.json({ message: 'File uploaded successfully', originalname });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Error uploading file' });
    }
});

fileRoute.get('/files', (req, res) => {
    try{
      fs.readdir('uploads/', (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return res.status(500).json({ message: 'Error reading directory' });
        }
        res.json({ files });
      });
    } catch(error) {
        res.status(500).json({ message: 'Error getting file' });
    }
});

fileRoute.get('/download/:filename', (req, res) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join(__dirname, '../../uploads', filename);

      if (fs.existsSync(filePath)) {
        res.download(`uploads/${filename}`);
      } else {
        res.status(404).json({ message: 'File not found' });
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).json({ message: 'Error downloading file' });
    }
});

module.exports = fileRoute;