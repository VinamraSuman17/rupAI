const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController.js');

// POST /api/chat
router.post('/', handleChat);

module.exports = router;