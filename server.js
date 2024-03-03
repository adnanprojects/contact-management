const express = require('express');
const dotenv = require('dotenv').config();
const router = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');

// App
const app = express();

const port = process.env.PORT || 5000;

connectDB();

// MiddleWare
app.use(express.json());
app.use('/api/contacts', router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App is running on port, ${port}`);
});