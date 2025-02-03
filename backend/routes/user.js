const express = require('express')

//controller functions
const {userSignup, userLogin} = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/login', userLogin)

//sign up route
router.post('/signup', userSignup)

module.exports = router
