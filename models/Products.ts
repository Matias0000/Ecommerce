import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      unique: true,
   },
   price: {
      type: Number,
      required: true,
   },
   code: {
      type: String,
      required: true,
    },
   stock: {
      type: Number,
      required: true,
      default: 1,
    },
    description: String,
   thumbnail: String,
})

module.exports = mongoose.models.Product || mongoose.model('Product',ProductSchema)