const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/file.controller');
const auth = require('../middleware/auth.middleware');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    // Create a unique filename: timestamp + original name
    const uniqueFilename = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Protected routes
router.post('/upload', auth, upload.single('file'), fileController.uploadFile);
router.get('/user', auth, fileController.getFilesByUser);
router.delete('/:fileId', auth, fileController.deleteFile);

// Public routes
router.get('/share/:shareId', fileController.getFileByShareId);
router.get('/download/:shareId', fileController.downloadFileByShareId);

module.exports = router; 