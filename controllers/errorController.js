// middlewares/globalErrorHandler.js
const AppError = require('./../utils/appError');

// Handle invalid ID
const handleCastError = (error) => {
    const message = `Invalid ${error.path}: ${error.value}`;
    return new AppError(message, 400);
};

// Handle Duplicate Field
const handleDuplicateField = (error) => {
    const message = `The name for ${error.keyValue.name}. has already been taken.  Please use another name!`;
    return new AppError(message, 400);
};

// Handle Validation Error
const handleValidationError = (error) => {
    const errors = Object.values(error.errors).map((el) => el.message);
    const message = `invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

// Handle development errors
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

// Handle production errors
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error('ERROR 💥', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'dev') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'prod') {
        let error = { ...err };
        error.message = err.message;
        error.name = err.name;

        if (error.name === 'CastError') error = handleCastError(error);
        if (error.code === 11000) error = handleDuplicateField(error);
        if (error.name === 'ValidationError')
            error = handleValidationError(error);

        sendErrorProd(error, res);
    }
};
