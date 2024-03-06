const bcrypt = require('bcrypt')
const User = require('../models/userModel');

// @desc Register a user
// @route REGISTER api/users/register
// @access public
const registerUser = async (request, response) => {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
        response.status(400);
        throw new Error('All fields are mandatory');
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        response.status(400);
        throw new Error('User already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashed password: ', hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    await response.json({ message: 'Register the user' });
}

// @desc Login a user
// @route LOGIN api/users/login
// @access public
const loginUser = async (request, response) => {
    await response.json({ message: 'Login the user' });
}

// @desc Current status of user
// @route CURRENT api/users/current
// @access private
const currentUser = async (request, response) => {
    response.json({ message: 'Your status is this' });
}

module.exports = {
    registerUser,
    loginUser,
    currentUser
}