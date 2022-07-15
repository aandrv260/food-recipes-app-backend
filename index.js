const express = require('express');
const dotenv = require('dotenv');
const recipeRouter = require('./routes/recipesRoutes');

const app = express();

// Configure the environment variables
dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 4000;

// Parse request body
app.use(express.json());

// Routes
app.use('/api/v1/recipes', recipeRouter);

// Starting the server
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
