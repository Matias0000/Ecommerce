import mongoose from "mongoose";
import {ICart} from '../types/cart'
import { IProduct } from '../types/product';

const cartSchema = new mongoose.Schema(
   {
    //  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
     products: [],
   },
   
   {
     timestamps: true,
   }
 );
 
// export const MessageModel = mongoose.model('Message', Cart);

// export const Cart = mongoose.model<ICart>('Cart', cartSchema);

module.exports = mongoose.models.Cart || mongoose.model('Cart',cartSchema)