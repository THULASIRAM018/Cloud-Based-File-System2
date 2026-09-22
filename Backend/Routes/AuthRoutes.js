<<<<<<< HEAD
const { SignUp, Login, verifyToken, SignOut } = require('../Controller/AuthController')
const { LoginValidation, SignUpValidation } = require('../Middlewares/AuthMiddleware')

const router=require('express').Router()

router.post('/login',LoginValidation,Login)//for login validation middleware and login and passing jwtToken through cookie
router.post('/signup',SignUpValidation,SignUp)//for Sign Up validation middleware and login
router.get('/verify-token',verifyToken)//to verify user and pass userName
router.post('/logout',SignOut)//to logout


module.exports=router
=======
const express = require("express");
const { SignUp, Login, verifyToken, SignOut } = require('../Controller/AuthController')
const { LoginValidation, SignUpValidation } = require('../Middlewares/AuthMiddleware')

const router = express.Router();

router.post("/login", LoginValidation, Login);
router.post("/register", SignUpValidation, SignUp);
router.get("/verify-token", verifyToken);
router.post("/logout", SignOut);

module.exports = router;
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
