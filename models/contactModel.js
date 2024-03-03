const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name']
    },
    email: {
        type: String,
        required: [true, 'Enter your Email address']
    },
    phone: {
        type: String,
        required: [true, 'Enter your phone number']
    }
},
    {
        timeStamps: true,
    }
);

module.exports = mongoose.model('Contact', contactSchema);