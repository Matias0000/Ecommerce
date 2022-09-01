/* eslint-disable import/no-anonymous-default-export */
import * as express from 'express' 
import { Request, Response, NextFunction } from 'express';
import Cart from '../../../models/Cart'
import Product from '../../../models/Products'
import {connectDb} from '../../../config/db'
import { isValidObjectId } from 'mongoose';

connectDb()

export default async function (req:any,res:any){
    const {method,query:{carritoId},body}=req;
    // console.log(req.query);
    switch(method){
        case "GET":
            try {
                const cart = await Cart.findById(carritoId);
                // const productos = cart.products.findOne()
                
                    if (!cart) return res.status(404).json({ msg: "Product does not exists" });
                return res.status(200).json({cart:cart.products});
              } catch (error) {
                return res.status(400).json({ msg: error.message });
              }
        case "POST":
          
            const {query:{carritoId},body}=req;
            // console.log("a donde",req.query);
            
            try {
                // const cart = await Cart.create({});
                const cart = await Cart.findById(carritoId);   

                // cart.title=req.body.title
                // console.log(req.body);
                // console.log(cart.products);
                console.log(cart);
                cart.products.push(req.body)
                console.log(cart);
                
                return res.status(200).json({cart:cart.products})

            } catch (error) {
                return res.status(500).json({msg:"error post"});
            }
            
        case "DELETE":

            try {
                const product = await Product.findByIdAndDelete(productsId);
                    if (!product) return res.status(404).json({ msg: "Product does not exists" });
                return res.status(200).json(product);
              } catch (error) {
                return res.status(400).json({ msg: error.message });
              }
        case "PUT":

            try {
                const product = await Product.findByIdAndUpdate(productsId, body, {
                  new: true,
                  runValidators: true,
                });
                if (!product) return res.status(404).json({ msg: "Product does not exists" });
                return res.status(200).json(product);
              } catch (error) {
                return res.status(400).json({ msg: error.message });
              }
        default:
            return res.status(400).json({msg:"this method not supported ID"})
    }


}



