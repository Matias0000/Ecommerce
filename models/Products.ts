// import mongoose from 'mongoose';
// import { IProduct } from '../types/product';

// const productSchema = new mongoose.Schema<IProduct>(
//   {
//     name: {String},
//     price: {
//       type: Number,
//       required: true,
//     },
//     description: String,
//     image: String,
//     code: {
//       type: String,
//       required: false,
//     },
//     stock: {
//       type: Number,
//       required: false,
//       default: 1,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // export const Product = mongoose.model<IProduct>('Product', productSchema);

// module.exports = mongoose.models.Product || mongoose.model('Product',productSchema)
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
   thumbnail: String,
})

module.exports = mongoose.models.Product || mongoose.model('Product',ProductSchema)