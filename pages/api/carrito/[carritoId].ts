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
    console.log(req.query);
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
          try {
            // const cart = await Cart.findByIdAndUpdate(carritoId, body, {
            //   new: true,
            //   runValidators: true,
            // });
            
            const cart = await Cart.insertOne({
              new: true,
              runValidators: true,
            });

            if (!cart) return res.status(404).json({ msg: "Product does not exists" });
            return res.status(200).json(cart);
          } catch (error) {
            return res.status(400).json({ msg: error.message });
          }
        
        case "DELETE":
            try {
                const cart = await Cart.findByIdAndDelete(carritoId);
                console.log(cart);
                
                    if (!cart) return res.status(404).json({ msg: "Cart does not exists" });
                return res.status(200).json(cart);
              } catch (error) {
                return res.status(400).json({ msg: error.message });
              }
        case "PUT":
            try {
                const cart = await Cart.findByIdAndUpdate(carritoId, body, {
                  new: true,
                  runValidators: true,
                });
                console.log(body);
                console.log(carritoId);
                
                
                if (!cart) return res.status(404).json({ msg: "Product does not exists" });
                return res.status(200).json(cart);
              } catch (error) {
                return res.status(400).json({ msg: error.message });
              }
        default:
            return res.status(400).json({msg:"this method not supported ID"})
    }


}



