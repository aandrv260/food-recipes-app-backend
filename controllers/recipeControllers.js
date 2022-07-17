const fs = require('fs');
const Recipe = require('../models/recipeModel');
const APIFeatures = require('../assets/apiFeatures');
const { removeSpecialFieldsFromQuery } = require('../assets/helperFunctions');

// Fetch recipes
const recipes = JSON.parse(fs.readFileSync(`${__dirname}/../testData.json`, 'utf-8'));

exports.getAllRecipes = async (req, res) => {
  try {
    const features = new APIFeatures(Recipe.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const recipes = await features.query;

    res.status(200).json({
      status: 200,
      requestedAt: req.requestTime,
      results: recipes.length,
      data: {
        recipes,
      },
    });
  } catch (err) {
    console.log(err);
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
