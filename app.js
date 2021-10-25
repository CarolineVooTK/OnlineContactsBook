const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const categoryRouter = require('./routes/categoryRoutes');
const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Log requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request rate to prevent DOS and brute force attacks
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use(limiter);

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/categories', categoryRouter);

// Handle all unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
