const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

router.post('/send-message', messageController.receiveMessage);
router.get('/validate-integrity', messageController.validateIntegrity);

module.exports = router;
