const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');

// App
const app = express();

const port = process.env.PORT || 5000;

connectDB();

// MiddleWare
app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App is running on port, ${port}`);
});