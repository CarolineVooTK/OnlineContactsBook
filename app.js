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
app.use('/api/contacts', contactRouter);
app.use('/api/categories', categoryRouter);

module.exports = app;
