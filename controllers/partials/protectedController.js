const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const catchAsync = require('../../utils/asyncError');
const AppError = require('../../utils/appError');

exports.protected = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(
            new AppError(
                'You are not logged in! Please log in to get access.',
                401
            )
        );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const checkUser = await User.findById(decoded.id);
    if (!checkUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }
    if (checkUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                'User recently changed password! Please log in again.',
                401
            )
        );
    }
    req.user = checkUser;
    next();
});

exports.protectRoleby = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('you do not have permissions to this action', 403)
            );
        }
        next();
    };
};
