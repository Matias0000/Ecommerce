import { Request, Response, Router } from 'express';
import jwt from 'jsonwebToken'
import bcrypt from 'bcrypt'
import axios from 'axios';
import {serialize} from 'cookie'
import MongoStore from 'connect-mongo';
import User from '../../../models/Users'
import {connectDb} from '../../../config/db'


export default async function loginHandle(req:Request,res:Response){
    connectDb()
    const {email,password}= req.body;

    const user = await User.findOne({email})  

    if(!user)
    return res.json({status:'Not able to find the user'})
    const passValidate = await bcrypt.compare(password,user.password)
    // const passValidate='password'
    if(!passValidate)
    // return res.json({msg:"Incorrect userName or Password",status:false})
    return res.status(401).json({ error: "Invalid credentials" });

    
    if(user){
        const token = jwt.sign({
            exp:Math.floor(Date.now()/1000)+(60*60),
            email:'asd@asd.asd',
            name:'prueba'
        },process.env.JWTSECRET!);

    const serialized = serialize("myTokenName", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",//node en caso de comnunicarse con un backend
        maxAge: 1000 * 60 * 10,
        path: "/",
      });

    res.setHeader('set-Cookie',serialized);
    // res.setHeader('home','/');
    // return res.status(200).json({
    //     message: "Login successful",
    //   })
    // } 
    return res.redirect('/')}
    // return res.status(401).json({ error: "Invalid credentials" });
}