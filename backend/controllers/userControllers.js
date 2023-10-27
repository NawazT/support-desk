const asyncHandler = require('express-async-handler')

// Func -         Register a new user
// route -        /api/users
// access type -  Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password)
    {
        res.status(400)
        throw new Error ('Please Include all fields')
    }

    res.send('Resgister Route')
})

// Func -         Login an exisitng user
// route -        /api/users/login
// access type -  Public
const loginUser = asyncHandler(async(req, res) => {
    res.send('Login User')
})

module.exports = {
    registerUser,
    loginUser
}