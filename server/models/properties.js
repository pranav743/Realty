const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  propertyID: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: true,
  },
});

propertySchema.index({ location: "2dsphere" });

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
