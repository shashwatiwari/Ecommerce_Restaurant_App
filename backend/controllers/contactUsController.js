const ContactUsMessage = require('../models/ContactUsMessage');

exports.submitMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newMessage = new ContactUsMessage({
            name,
            email,
            message,
        });

        await newMessage.save();

        res.status(201).json({ message: 'Message submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
