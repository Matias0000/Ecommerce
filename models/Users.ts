import mongoose from "mongoose";
import { IUser} from "../types/user";

const UserSchema = new mongoose.Schema<IUser>({
   nombre: {
     type: String,
     required: true,
   },
   edad: {
      type: Number,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   direccion: {
      type: String,
      required: false,
   },
   telefono: {
      type: String,
      required: false,
   },
   foto: {
     type: String,
     required: false,
   },
 },
 {
   timestamps: true,
 })

// export const UserModel = mongoose.model('User', UserSchema);

module.exports = mongoose.models.User || mongoose.model('User',UserSchema)