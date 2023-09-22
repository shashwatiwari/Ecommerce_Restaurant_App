const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const contactUsRoutes = require('./routes/contactusRoutes')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
));
app.use(bodyParser.json());

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.use('/api/auth', authRoutes);
app.use('/api/contact-us', contactUsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
