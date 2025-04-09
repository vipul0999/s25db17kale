const mongoose = require("mongoose");

// Define schema for a Gadget with validation
const gadgetSchema = mongoose.Schema({
  gadget_name: {
    type: String,
    required: [true, "Gadget name is required"]
  },
  brand: {
    type: String,
    required: [true, "Brand is required"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"]
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Export the model
module.exports = mongoose.model("Gadget", gadgetSchema);
