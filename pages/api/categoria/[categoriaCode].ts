/* eslint-disable import/no-anonymous-default-export */
import * as express from 'express' 
import { Request, Response, NextFunction } from 'express';
import Product from '../../../models/Products'
import {connectDb} from '../../../config/db'
import { isValidObjectId } from 'mongoose';

connectDb()

export default async function (req:any,res:any){
    const {method,query:{categoriaCode},body}=req;
    switch(method){
        case "GET":
            try {
                const product = await Product.find({"code":categoriaCode});
                    if (!product) return res.status(404).json({ msg: "Product does not exists" });
                return res.status(200).json(product);
              } catch (error) {
                return res.status(400).json({ msg: error.message });
              }
        case "DELETE":
            // DeleteProduct(req,res);
            // break;
            try {
                const product = await Product.findByIdAndDelete(categoriaId);
                    if (!product) return res.status(404).json({ msg: "Product does not exists" });
                return res.status(200).json(product);
              } catch (error) {
                return res.status(400).json({ msg: error.message });
              }
        case "PUT":
            // UpdateBooks(req,res);
            // break
            try {
                const product = await Product.findByIdAndUpdate(categoriaId, body, {
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

// const getProducts = (req:any,res:any) =>{
//     const {bookId} =req.query;
//     const book = Product.find((book) => book.id == bookId);
//     if(!book){
//         res.status(404).json({message: `Book with id ${bookId} not found`});
//     }
//     res.status(200).json(book)
// }

// const UpdateBooks = (req:any,res:any) =>{
//     const {bookId}=req.query;
//     const index = Product.findIndex((products) => products.id == bookId)
//     Product.splice(index,1,req.body)
//     res.status(200).json({messsage:`Book with id ${bookId} Update `})
// }


// const DeleteProduct = async(req, res)=> {
//     const {id} = req.query;
//     try {
//       const result = await Product.findByIdAndDelete(id);
//       console.log(result);
//       res.json(result);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }


