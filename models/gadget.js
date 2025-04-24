const mongoose = require("mongoose");

const gadgetSchema = mongoose.Schema({
  gadget_name: {
    type: String,
    required: [true, "Gadget name is required"],
    minlength: [2, "Gadget name must be at least 2 characters"]
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
    minlength: [2, "Brand must be at least 2 characters"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [50, "Price must be at least $50"],
    max: [2000, "Price must not exceed $2000"]
  }
});

module.exports = mongoose.model("Gadget", gadgetSchema);
