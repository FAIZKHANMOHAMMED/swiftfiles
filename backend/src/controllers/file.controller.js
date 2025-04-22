const File = require('../models/file.model');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Get base URL from environment variable or use request-based URL as fallback
const getBaseUrl = (req) => {
  if (process.env.PUBLIC_URL) {
    return process.env.PUBLIC_URL.trim();
  }
  return `${req.protocol}://${req.get('host')}`;
};

// Get frontend URL from environment or use a default
const getFrontendUrl = () => {
  return process.env.FRONTEND_URL || 'https://swiftfiles.netlify.app';
};

// Upload a new file
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { filename, mimetype, size, path: filePath } = req.file;
    const shareId = uuidv4();
    
    // Create file URL
    const baseUrl = getBaseUrl(req);
    const fileUrl = `${baseUrl}/uploads/${filename}`;
    
    // Create shareable URLs using the frontend URL
    const frontendUrl = getFrontendUrl();
    const shareUrl = `${frontendUrl}/share/${shareId}`;

    // Save file metadata to database
    const file = await File.create({
      name: filename,
      size,
      type: mimetype,
      url: fileUrl,
      share_id: shareId,
      owner_id: req.user._id
    });

    res.status(201).json({
      metadata: {
        id: file._id,
        name: file.name,
        size: file.size,
        type: file.type,
        created_at: file.createdAt,
        owner_id: file.owner_id.toString(),
        url: file.url,
        share_id: file.share_id,
        share_url: shareUrl
      }
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get files for a user
exports.getFilesByUser = async (req, res) => {
  try {
    const files = await File.find({ owner_id: req.user._id })
      .sort({ createdAt: -1 });
    
    const frontendUrl = getFrontendUrl();

    res.json({
      files: files.map(file => ({
        id: file._id,
        name: file.name,
        size: file.size,
        type: file.type,
        created_at: file.createdAt,
        owner_id: file.owner_id.toString(),
        url: file.url,
        share_id: file.share_id,
        share_url: `${frontendUrl}/share/${file.share_id}`
      }))
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get file by share ID
exports.getFileByShareId = async (req, res) => {
  try {
    const { shareId } = req.params;
    
    const file = await File.findOne({ share_id: shareId });
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    const frontendUrl = getFrontendUrl();
    
    res.json({
      file: {
        id: file._id,
        name: file.name,
        size: file.size,
        type: file.type,
        created_at: file.createdAt,
        owner_id: file.owner_id.toString(),
        url: file.url,
        share_id: file.share_id,
        share_url: `${frontendUrl}/share/${file.share_id}`
      }
    });
  } catch (error) {
    console.error('Get file error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Download file by share ID - direct download endpoint
exports.downloadFileByShareId = async (req, res) => {
  try {
    const { shareId } = req.params;
    
    const file = await File.findOne({ share_id: shareId });
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Get file path from URL
    const filename = path.basename(file.url);
    const filePath = path.join(uploadsDir, filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }
    
    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    res.setHeader('Content-Type', file.type);
    
    // Stream the file to the client
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('Download file error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a file
exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    
    // Find file in database
    const file = await File.findOne({ 
      _id: fileId,
      owner_id: req.user._id
    });
    
    if (!file) {
      return res.status(404).json({ 
        message: 'File not found or you do not have permission to delete it' 
      });
    }
    
    // Get file path from URL
    const filename = path.basename(file.url);
    const filePath = path.join(uploadsDir, filename);
    
    // Delete file from disk if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Delete file metadata from database
    await File.deleteOne({ _id: fileId });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 