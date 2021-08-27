const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://davinci:davinci@davinci.gfolr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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

// use middlewares
app.use(express.json());
app.use(cors);

// routes
app.get('/', (req, res) => res.send('this works'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
