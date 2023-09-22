const mongoose = require('mongoose');

const contactUsMessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ContactUsMessage', contactUsMessageSchema);
