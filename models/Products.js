import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Categories",
  },
  images: [{ type: String }],
  sizes: [
    {
      size: Number,
      qty: Number,
    },
  ],
  lice: {
    type: String,
    required: true,
  },
  postava: {
    type: String,
    required: true,
  },
  djon: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  limited: {
    type: Boolean,
    default: false,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  exclusive: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.models.shoe || mongoose.model("shoe", productSchema);

export default Product;
