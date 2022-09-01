import {connectDb} from '../../../config/db'
import Cart from '../../../models/Cart'
import Product from '../../../models/Products'

import { Request, Response, NextFunction } from 'express';
// import Products from './products';
// import Products from '../../../models/Products'
/* eslint-disable import/no-anonymous-default-export */

connectDb()

export default async function handler(req,res){
    const {method,body}=req;
    switch(method){
        case"GET":
            getCarrito(req,res);
        break;
        case "POST":
            createCarrito(req,res)       
        break;
        default:
            return res.status(400).json({msg:"this method is not supported"})
    }
    
}

const getCarrito = async(req,res)=>{
    const cart=await Cart.find();
    // console.log(product);
    res.status(200).json(cart)
}

const createCarrito = async(req,res) =>{
    try {

        const cart = await Cart.create({ products: [], timestamp: Date.now() });
        // const newProduct = new Cart(req.body)
        // // console.log("HOla", newProduct);
        
        // const saveProduct = await newProduct.save()
        // console.log("HOla", req.body , saveProduct);
        return res.status(200).json(cart)
        return cart?.id;
    } catch (error) {
        return res.status(500).json({msg:"error"});
    }
    
}
