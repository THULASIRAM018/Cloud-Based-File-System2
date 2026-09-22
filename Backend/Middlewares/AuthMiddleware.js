const Joi = require('joi');

// Signup validation
const SignUpValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be valid'
        }),
        userName: Joi.string().min(4).max(18).required().messages({
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 4 characters',
            'string.max': 'Username must be at most 18 characters'
        }),
        password: Joi.string().min(6).max(20).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters',
            'string.max': 'Password must be at most 20 characters'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Bad Request',
            error: error.details[0].message,
            success: false
        });
    }
    next();
};

// Login validation
const LoginValidation = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().min(4).max(18).required().messages({
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 4 characters',
            'string.max': 'Username must be at most 18 characters'
        }),
        password: Joi.string().min(6).max(20).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters',
            'string.max': 'Password must be at most 20 characters'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Bad Request',
            error: error.details[0].message,
            success: false
        });
    }
    
    next();
};

module.exports = { SignUpValidation, LoginValidation };
<<<<<<< HEAD

// JWT verification middleware
const jwt = require('jsonwebtoken');

const JWTVerify = (req, res, next) => {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }
    if (!token) {
        return res.status(401).json({ message: 'No token provided', success: false });
    }
    try {
        const key = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, key);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token', success: false });
    }
};

module.exports.JWTVerify = JWTVerify;
=======
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
