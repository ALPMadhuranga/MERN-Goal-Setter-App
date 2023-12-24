const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const userModel = require('../models/userModel')

// @description Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {          // create controller for register user
    const { name, email, password } = req.body

    if( !name || !email || !password ) {            //check input fields empty
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user exists
    const userExists = await userModel.findOne({email})
    
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash passowrd
    const salt = await bcrypt.genSalt(10)                       // Generates a "salt," which is a random data used as an additional input to the password hashing process. The number 10 represents the cost factor, determining the number of rounds the hashing function will run, making it computationally expensive for attackers.
    const hashedPassword = await bcrypt.hash(password, salt)    // Hashes the original password using the generated salt. The password is the plaintext password you want to hash, and salt is the random data generated in the previous step. The result, hashedPassword, is the securely hashed version of the password.

    // Create user
    const user = await userModel.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.json({message: 'Register User' })
})

// @description Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {          // create controller for login user
    const {email, password} = req.body

    // Check for user email
    const user = await userModel.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @description Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async(req, res) => {          // create controller for identify user
    const { _id, name, email } = await userModel.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})


// Generate Jason Web Token (JWT)
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}