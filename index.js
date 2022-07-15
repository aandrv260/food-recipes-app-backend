const express = require('express');
const recipeRouter = require('./routes/recipesRoutes');

const app = express();
const PORT = 8000;

// Parse request body
app.use(express.json());

// Routes
app.use('/api/v1/recipes', recipeRouter);

// Starting the server
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
