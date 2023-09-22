const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contactUsController');

router.post('/submit', contactUsController.submitMessage);

module.exports = router;
