
import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    name: String,
    precio: Number,
    code: String,
    imagen: String,
    stock:Number,
    description:String,
})

// module.exports = mongoose.model("Carrito", carritoSchema)

module.exports = mongoose.models.Carrito || mongoose.model('Carrito',carritoSchema)