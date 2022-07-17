const fs = require('fs');
const Recipe = require('../models/recipeModel');

// Fetch alkl
const recipes = JSON.parse(fs.readFileSync(`${__dirname}/../testData.json`, 'utf-8'));

exports.getAllRecipes = async (req, res) => {
  try {
    // Get all recipes from the database
    const recipes = await Recipe.find();

    res.status(200).json({
      status: 200,
      requestedAt: req.requestTime,
      results: recipes.length,
      data: {
        recipes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const { body } = req;
    const newRecipe = await Recipe.create(body);

    res.status(201).json({
      status: 'success',
      data: {
        recipe: newRecipe,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getRecipe = (req, res) => {};
