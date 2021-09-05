const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const contactRouter = require('./routes/contactRoutes');
const categoryRouter = require('./routes/categoryRoutes');

const app = express();

// Log requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/contact', contactRouter);
app.use('/api/category', categoryRouter);

module.exports = app;
