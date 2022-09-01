import mongoose from 'mongoose';
import {connect,connection} from 'mongoose'

export const connectDb = async () => {
  try {
    const db =await mongoose.connect(process.env.MONGO_URI!, {});
    console.log(db.connections[0].readyState)
    console.log('Connected to MongoDB');
    
  } catch (error) {
    console.error(error);
  }
};

connection.on("connected",()=>{
  console.log("Mongo conectado");
  
})