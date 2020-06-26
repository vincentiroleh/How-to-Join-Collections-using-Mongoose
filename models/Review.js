const mongoose = require("mongoose");

// Get the Schema constructor
const Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
const ReviewSchema = new Schema({
  stars: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});

// Create model from the schema
const Review = mongoose.model("Review", ReviewSchema);

// Export model
module.exports = Review;