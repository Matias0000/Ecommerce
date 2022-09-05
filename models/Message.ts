import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({
   author: {
      id: String,
      name: String,
      lastname: String,
      alias: String,
      age: Number,
      avatar: String,
   },
   text: {
      type: String,
      required: true,
   },
   date: Date,
})

// module.exports = mongoose.model("Messages", MessageSchema);

// export const MessageModel = mongoose.model('Message', MessageSchema);
module.exports = mongoose.models.Messages || mongoose.model('Messages',MessageSchema)