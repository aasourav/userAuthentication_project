const express = require('express');
const router = express.Router();
const {signup,login,varifyToken, getUser,refreshToken, logout} = require('../controller/userController')

router.post('/signup',signup)
router.post('/login',login)
router.get('/user', varifyToken,getUser)
router.get('/refresh', refreshToken,varifyToken,getUser)
router.post('/logout',varifyToken,logout)


module.exports = router;