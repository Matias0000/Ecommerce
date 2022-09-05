
import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    title: String,
    price: Number,
    code: String,
    thumbnail: String,
    stock:Number,
    description:String,
    
})

// module.exports = mongoose.model("Carrito", carritoSchema)

module.exports = mongoose.models.Carrito || mongoose.model('Carrito',carritoSchema)