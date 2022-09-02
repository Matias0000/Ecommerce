import {connectDb} from '../../config/db'
// import User from '../../models/user'
import User from '../../models/Users'
import bcrypt from 'bcrypt';

connectDb()

export default async function handler(req,res){
    try {
        const hashedPw = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            email: req.body.email,
            password: hashedPw,
            nombre:req.body.nombre,
            edad:req.body.edad,
            telefono:req.body.telefono,
            foto:req.body.foto,
          });
          
          
        res.redirect('/login')
        if(!user){
            return res.json({"code":'User not created'})
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create a new user.'})
    }
}