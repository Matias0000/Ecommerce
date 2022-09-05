import {connectDb} from '../../../config/db'
import Messages from '../../../models/Message'
import { Request, Response, NextFunction } from 'express';

/* eslint-disable import/no-anonymous-default-export */

connectDb()

export default async function handler(req,res){
    const {method,body}=req;
    switch(method){
        case"GET":
            getMessages(req,res);
        break;
        case "POST":
            createMessages(req,res)     
        break;
        default:
            return res.status(400).json({msg:"this method is not  supported"})
    }  
}

const getMessages = async(req,res)=>{
    const product=await Messages.find();
    // console.log(product);
    res.status(200).json(product)
}

const createMessages = async(req,res) =>{
    try {
        const newProduct = new Messages(req.body)
        const saveProduct = await newProduct.save()
        return res.status(200).json(saveProduct)
    } catch (error) {
        return res.status(500).json({msg:"error"});
    }
    
}
