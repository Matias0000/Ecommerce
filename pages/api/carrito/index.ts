import {connectDb} from '../../../config/db'
import Cart from '../../../models/Cart'
import Product from '../../../models/Products'
import Carrito from '../../../models/carrito'
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
    const cart=await Carrito.find();
    // console.log(product);
    res.status(200).json(cart)
}

const createCarrito = async(req,res) =>{
    const {body}=req
    try {

        const producto = req.body
        const cart = await new Carrito(producto);
        // const newProduct = new Cart(req.body)
        // // console.log("HOla", newProduct);
        cart.save()
        // const saveProduct = await newProduct.save()
        // console.log("HOla", req.body , saveProduct);
        return res.status(200).json("agregado")
        // return cart?.id;
    } catch (error) {
        return res.status(500).json({msg:"error"});
    }
    
}
