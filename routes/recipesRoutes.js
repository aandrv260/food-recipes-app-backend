const express = require('express');
const { getAllRecipes, getRecipe, createRecipe } = require('../controllers/recipeControllers');

const router = express.Router();

router.route('/').get(getAllRecipes).post(createRecipe);
router.route('/:id').get(getRecipe);

module.exports = router;
