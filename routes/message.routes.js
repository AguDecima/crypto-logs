const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

router.get('/send-message', messageController.receiveMessage);

module.exports = router;
