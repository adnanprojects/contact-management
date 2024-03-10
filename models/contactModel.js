const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: { //for private session
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
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
