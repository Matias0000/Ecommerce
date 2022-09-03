import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
/* eslint-disable import/no-anonymous-default-export */

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    
    const io = new ServerIO(httpServer, {
      path: "/api/chat/socketio",
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }
  res.end();
};