const express = require("express");
const { SignUp, Login, verifyToken, SignOut } = require('../Controller/AuthController')
const { LoginValidation, SignUpValidation } = require('../Middlewares/AuthMiddleware')

const router = express.Router();

router.post("/login", LoginValidation, Login);
router.post("/register", SignUpValidation, SignUp);
router.get("/verify-token", verifyToken);
router.post("/logout", SignOut);

module.exports = router;
