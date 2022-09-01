import {connectDb} from '../../../config/db'
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
            getProducts(req,res);
        break;
        case "POST":
            // console.log(body);
            // res.status(200).json("product create")
            createProduct(req,res)
            // const newProduct = new Product(body)
            // const saveProduct = await newProduct.save()
            // return res.status(200).json(saveProduct)
        break;
        default:
            return res.status(400).json({msg:"this method is not  supported"})
    }
    
}

const getProducts = async(req,res)=>{
    const product=await Product.find();
    // console.log(product);
    res.status(200).json(product)
}

const createProduct = async(req,res) =>{
    try {
        const newProduct = new Product(req.body)
        const saveProduct = await newProduct.save()
        return res.status(200).json(saveProduct)
    } catch (error) {
        return res.status(500).json({msg:"error"});
    }
    
}
