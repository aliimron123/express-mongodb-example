// package-install
const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const limitRate = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');

// module
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const portofolioRouter = require('./routes/portofolioRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/partials/errorController');

// cors
app.use(cors());

// security http
app.use(helmet());

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));
}
// limiter access data
const limiter = limitRate({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from , please try again in an hour!',
});
app.use('/api/', limiter);

// body parser
app.use(express.json({ limit: '10kb' }));

// security for data sanitization against noSQL injection
app.use(mongoSanitize());

// security for data sanitization against XSS
app.use(xss());

// test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the home route!');
});

// routes
app.use('/api/tours', cors(), productRouter);
app.use('/api/users', cors(), userRouter);
app.use('/api/portofolio', cors(), portofolioRouter);

// Handling Uncaught Exception Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
