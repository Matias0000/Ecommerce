
import {verify} from 'jsonwebtoken'

export default function profileHandler(req,res){
    const {myTokenName} = req.cookies;

    if (!myTokenName) {
        return res.status(401).json({ error: "Not logged in" });
      }
    try {
        const user =verify(myTokenName,process.env.JWTSECRET!)
    console.log(user);
    
    res.json({email:user.email , userName:user.name});

    } catch (error) {
        return res.status(401).json({error:'invalid token'})    
    }
    
    
    // res.json({user:'1234'})
}