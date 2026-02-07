const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      required: true,
      enum: ["ring", "necklace", "bracelet", "earring", "bangle"]
    },

    metal: {
      type: String,
      enum: ["gold", "silver", "platinum"],
      required: true
    },

    weight: {
      type: Number, // grams
      required: true
    },

    images: [
      {
        type: String // Cloudinary URLs
      }
    ],

    stock: {
      type: Number,
      default: 0
    },

    isFeatured: {
      type: Boolean,
      default: false
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
