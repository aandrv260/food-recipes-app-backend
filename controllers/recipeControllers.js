const fs = require('fs');

// Fetch alkl
const recipes = JSON.parse(fs.readFileSync(`${__dirname}/../testData.json`, 'utf-8'));

exports.getAllRecipes = async (req, res) => {
  res.status(200).json({
    status: 200,
    requestedAt: req.requestTime,
    results: recipes.length,
    data: {
      recipes,
    },
  });
};

exports.getRecipe = (req, res) => {};
