const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const recipeRouter = require('./routes/recipesRoutes');

const app = express();

// Configure the environment variables
dotenv.config({ path: './config.env' });

// Connect to MongoDB
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB = process.env.DATABASE.replace('<PASSWORD>', DB_PASSWORD);

mongoose
  .connect(DB, {
    // Options that deal with deprecation warnings
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB connection successful');
  });

// Allow Access Origin and Methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application'
  );
  next();
});

const PORT = process.env.PORT || 4000;

// Parse request body
app.use(express.json());

// Routes
app.use('/api/v1/recipes', recipeRouter);

// Starting the server
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
