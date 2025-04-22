const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');
const mongoose = require('mongoose');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', auth, authController.getCurrentUser);

// Debug route - can be removed in production
router.get('/debug/collections', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Get count of users if the collection exists
    let userCount = 0;
    if (collectionNames.includes('users')) {
      userCount = await mongoose.connection.db.collection('users').countDocuments();
    }
    
    res.json({
      database: mongoose.connection.db.databaseName,
      collections: collectionNames,
      userCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 