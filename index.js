const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const contactRouter = require('./routes/contactRoutes');
const categoryRouter = require('./routes/categoryRoutes');

require('dotenv').config({ path: './config.env' });

// connect to database (TESTING COMMIT)
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@davinci.gfolr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/contact', contactRouter);
app.use('/api/category', categoryRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
