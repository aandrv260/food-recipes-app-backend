const express = require('express');
const { getAllRecipes, getRecipe } = require('../controllers/recipeControllers');

const router = express.Router();

router.route('/').get(getAllRecipes);
router.route('/:id').get(getRecipe);

module.exports = router;
