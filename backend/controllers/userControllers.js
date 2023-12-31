const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

// Func -         Register a new user
// route -        /api/users
// access type -  Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    //validation
    if(!name || !email || !password)
    {
        res.status(400)
        throw new Error ('Please Include all fields')
    }

    //Check if user already exists
    const userExists = await User.findOne({email})

    if(userExists) 
    {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash the Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create the user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user)
    {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: getToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// Func -         Login an exisitng user
// route -        /api/users/login
// access type -  Public
const loginUser = asyncHandler(async(req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password)))
    {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: getToken(user._id),
        })
    }
    else
    {
        res.status(401)
        throw new Error('Invalid credentials')
    }
    res.send('Login User')
})

// Func -         returns user info
// route -        /api/users/me
// access type -  Private
const getUser = asyncHandler(async(req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    }
    res.status(200).json(user)
})

//Get json Web Token
const getToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '60d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
}