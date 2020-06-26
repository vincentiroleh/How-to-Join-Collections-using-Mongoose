const mongoose = require("mongoose");

// Get the Schema constructor
const Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    departments: {
        type: Array,
        required: true
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: "Review"
    }
});

// Create model from the schema
const Product = mongoose.model("Product", ProductSchema);

// Export model
module.exports = Product;