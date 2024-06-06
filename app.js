const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

if (process.env.NODE_ENV) {
    app.use(morgan('dev'));
}
app.use(express.json());

app.use((req, res, next) => {
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/tours', productRouter);
app.use('/api/users', userRouter);

// Handling Uncaught Exception Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
