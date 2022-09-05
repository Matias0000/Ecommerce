/* eslint-disable import/no-anonymous-default-export */
import * as express from 'express' 
import { Request, Response, NextFunction } from 'express';
import Messages from '../../../models/Message'
import {connectDb} from '../../../config/db'
import { isValidObjectId } from 'mongoose';

connectDb()

export default async function (req:any,res:any){
    const {method,query:{messageId},body}=req;
    switch(method){
        case "GET":
            try {
                const message = await Messages.findById(messageId);
                    if (!message) return res.status(404).json({ msg: "Messages does not exists" });
                return res.status(200).json(message);
              } catch (error) {
                return res.status(400).json({ msg: error.message });
              }
        case "DELETE":
            // DeleteProduct(req,res);
            // break;
            try {
                const message = await Messages.findByIdAndDelete(messageId);
                    if (!message) return res.status(404).json({ msg: "Messages does not exists" });
                return res.status(200).json(message);
              } catch (error) {
                return res.status(400).json({ msg: error.message });
              }
        case "PUT":
            // UpdateBooks(req,res);
            // break
            try {
                const message = await Messages.findByIdAndUpdate(messageId, body, {
                  new: true,
                  runValidators: true,
                });
                if (!message) return res.status(404).json({ msg: "Messages does not exists" });
                return res.status(200).json(message);
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


