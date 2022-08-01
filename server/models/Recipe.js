const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This field is required"
    },
    description: {
        type: String,
        required: "This field is required"
    },
    email: {
        type: String,
        required: "This field is required"
    },
    ingredients: {
        type: Array,
        required: "This field is required"
    },
    category: {
        type: String,
        enum: ['Noodles', 'Burger', 'Pizza', 'African', 'Macaroni', 'Veggie'],
        required: "This field is required"
    },
    image: {
        type: String,
        required: "This field is required"
    }
});

recipeSchema.index({name:  'text', description: 'text'})
//wildcard indexing
// recipeSchema.index({  '*$***' : 'text'})

module.exports = mongoose.model('Recipe', recipeSchema)