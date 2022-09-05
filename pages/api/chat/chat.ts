import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/next";
/* eslint-disable import/no-anonymous-default-export */
import Messages from '../../../models/Message'

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {


  

  if (req.method === "POST") {
    // get message
    const message = req.body;

    // const prueba = async()=>{
    //   const messag= await Messages.find()
    // }
    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", message);

    // return message
    res.status(201).json(message);
  }
};
