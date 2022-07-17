const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    // [1] el is the error we want to display if this field is missing
    required: [true, 'A recipe must have a name'],
    unique: true,
  },

  category: {
    type: String,
    required: [true, 'A recipe must have category'],
  },

  servings: {
    type: Number,
    required: [true, 'A recipe must have servings'],
  },

  cookingTime: {
    type: Number,
    required: [true, 'A recipe must have cooking time'],
  },

  ingredients: {
    type: Array,
    required: [true, 'A recipe must have ingredients'],
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
