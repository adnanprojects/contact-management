const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: [true, 'This email is taken']
    },
    password: {
        type: String,
        required: [true, 'Please add the password']
    }
}, {
    timeStamps: true,
});

module.exports = mongoose.model('User', userSchema);