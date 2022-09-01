import React, { useState, useEffect, useRef } from "react";
import SocketIOClient from "socket.io-client";
// import tw from "twin.macro";
import { Confirm, Button, Loader, Grid } from "semantic-ui-react";
import User from '../../models/Users'
import { Navbar2 } from "../../component/NavBar2";

interface IMsg {
  user: string;
  msg: string;
}

// const user =  User.findOne({email})
// create random user
const user = "User_" + String(new Date().getTime()).substr(-3);

// component
const Index: React.FC = () => {
  const inputRef = useRef(null);

  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>("");

  useEffect((): any => {
    // connect to socket server
    const socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/chat/socketio",
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: IMsg) => {
      chat.push(message);
      setChat([...chat]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      // build message obj
      const message: IMsg = {
        user,
        msg,
      };

      // dispatch message to other users
      const resp = await fetch("/api/chat/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // reset field if OK
      if (resp.ok) setMsg("");
    }

    // focus after click
    inputRef?.current?.focus();
  };

  return (
    <>
    <Navbar2/>
    <div >
      
      <div >
        <h1 style={{textAlign:'center'}}> Chat App in Next.js and Socket.io</h1>
        
      </div>
      <div>
        <div className='ui large message' style={{color:'blue',textAlign:'center'}}>
          {chat.length ? (
            chat.map((chat, i) => (
              <div key={"msg_" + i} 
              // tw="mt-1"
              >
                <span
                  // css={chat.user === user ? tw`text-red-500` : tw`text-black`}
                >
                  {chat.user === user ? "Me" : chat.user}
                </span>
                : {chat.msg}
              </div>
            ))
          ) : (
            <div style={{color:'blue',textAlign:'center'}}
            // tw="text-sm text-center text-gray-400 py-6"
            >
              No chat messages
            </div>
          )}
        </div>
        <div style={{textAlign:'center'}}
        
        >
          <div 
          
          >
            <div className="ui big icon input " style={{}}>
              <input
                ref={inputRef}
                type="text"
                value={msg}
                placeholder={connected ? "Type a message..." : "Connecting..."}
                
                disabled={!connected}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
            </div>
            {/* <div style={{margin:'auto'}}> */}
              <Button className="big green" style={{margin:'10px'}}  
                onClick={sendMessage}
                disabled={!connected}
              >
                SEND
              </Button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default Index;
