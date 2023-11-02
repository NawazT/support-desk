const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser } = require('../controllers/userControllers')
const { protect } = require('../middleware/authMiddleware')
//endpoints

//register
router.post('/' , registerUser)

//authentication
router.post('/login' , loginUser)

router.get('/me' , protect, getUser)

module.exports = router