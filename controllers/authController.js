const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/asyncError');
const AppError = require('../utils/appError');

// take token
const TokenJwt = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const sendToken = (user, statusCode, res) => {
    const tokenCode = TokenJwt(user._id);
    const cookieOption = {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
    };
    if (process.env.NODE_ENV === 'prod') cookieOption.secure = true;
    res.cookie('jwt', tokenCode, cookieOption);
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token: tokenCode,
        data: {
            user,
        },
    });
};

// REGISTER OR SIGNUP USER
exports.signUpUser = catchAsync(async (req, res) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    sendToken(newUser, 201, res);
});

// LOGIN USER
exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // check if the email and password is correct
    if (!email || !password) {
        next(new AppError('Please provide email and password', 400));
    }

    // Check if email and password already exist
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(
            new AppError(
                'Incorrect Password or email , please check again !!',
                401
            )
        );
    }
    // return data and token
    // 3) If everything ok, send token to client
    sendToken(user, 200, res);
});

exports.logoutUser = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Successfully logged out!!',
    });
});

exports.getAllUserAdmin = catchAsync(async (req, res) => {
    const user = await Auth.find({ role: 'authority-admin' });
    res.status(200).json({
        status: 'Success',
        data: { user },
        message: 'Success show all user !!',
    });
});
