const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const DB = process.env.DB.replace(
  '<USERNAME>:<PASSWORD>',
  `${username}:${password}`
);

// connect to database (TESTING COMMIT)
const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

const app = require('./app');

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
