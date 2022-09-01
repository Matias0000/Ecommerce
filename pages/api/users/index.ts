import { Request, Response, Router } from 'express';
import {connectDb} from '../../../config/db'


connectDb()

export default function handlendr(req:Request,res:Response){
    res.status(200).json("hola con mongo conectado")
    
}
