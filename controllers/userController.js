const bcrypt = require('bcrypt')
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

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
    // console.log('hashed password: ', hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if (user) {
        response.status(201).json({ _id: user.id, email: user.email });
    } else {
        response.status(400);
        throw new Error('User data is not valid');
    }
    // response.json({ message: 'Register the user' });
}

// @desc Login a user
// @route LOGIN api/users/login
// @access public
const loginUser = async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        response.status(400);
        throw new Error('All fields are mandatory');
    }
    const user = User.findOne({ email });
    if (user && bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        response.status(200).json({ accessToken });
    }
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