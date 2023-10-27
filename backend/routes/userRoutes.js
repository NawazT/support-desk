const express = require('express')
const router = express.Router()
const { registerUser, loginUser} = require('../controllers/userControllers')

//endpoints

//register
router.post('/' , registerUser )

//authentication
router.post('/login' , loginUser )

module.exports = router