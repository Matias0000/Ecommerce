import React, { useState, useEffect, useRef } from "react";
import SocketIOClient, { io } from "socket.io-client";
// import tw from "twin.macro";
import { Confirm, Button, Loader, Grid } from "semantic-ui-react";
import User from '../../models/Users'
import { Navbar2 } from "../../components/NavBar2";
import Messages from '../../models/Message'

import 'bootstrap/dist/css/bootstrap.min.css' 


interface IMsg {
  user: string;
  msg: string;
}

const cargarUsuario = ()=>{}

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
  const [messageP, setMessageP]= useState(
    {
      email:"",
      edad:"",
      apellido:"",
      alias:"",
      avatar:"",
      nombre:"",
    })
  
    const handleChange = (event) => {
      setMessageP({ ...messageP, [event.target.name]: event.target.value });
    };

    
    

  useEffect((): any => {
    // connect to socket server
    const socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/chat/socketio",
    });

    // log socket connection
    socket.on("connect", () => {

      const emmitMessage = async()=>{
        
        const res = await fetch("http://localhost:3000/api/messages");
        const message = await res.json();
        console.log(message);
        

      }
      emmitMessage();
      
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
    console.log(setMessageP);
    if (msg) {
      // build message obj
      const message: IMsg = {
        user,
        msg,
      };
      const preuba ={
        messageP
      }

      const usuario = {

      }
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
  const gola =() =>{ alert()};
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
              <div key={"msg_" + i} >
                <span>
                  {chat.user === user ? "Me" : chat.user}
                </span>
                : {chat.msg}
              </div>
            ))
          ) : (
            <div style={{color:'blue',textAlign:'center'}}>
              No chat messages
            </div>
          )}
        </div>


        <div style={{textAlign:'center'}}>
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
              {/* <Button className="big green" style={{margin:'10px'}}  
                onClick={gola}>
                alert
              </Button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
          
  <form id="messages" className="row align-items-center" onSubmit={(e) => {setMsg}}>

  <div className="col">
    <div>

    <label form="email" className="form-label">Email</label>
    <input type="text" id="email" name="email" className="form-control" onChange={handleChange}/>
    </div>
    <div>
    <label form="lastname" className="form-label">Apellido</label>
    <input type="text" id="lastname" name="lastname" className="form-control" onChange={handleChange}/>
    </div>
  </div>
	<div className="col">
		<label form="age" className="form-label">Edad</label>
		<input type="number" id="age" name="age" className="form-control"onChange={handleChange}/>

		<label form="alias" className="form-label">Alias</label>
		<input type="text" id="alias" name="alias" className="form-control"onChange={handleChange}/>
	</div>
		<div className="col">
		<label form="avatar" className="form-label">Avatar</label>
		<input type="text" id="avatar" name="avatar" className="form-control"/>
	
		<label form="name" className="form-label">Nombre</label>
		<input type="text" id="name" name="name" className="form-control"onChange={handleChange}/>
	</div>
	<div>

		<label form="message" className="form-label">Mensaje</label>
		<textarea type="text" id="message" name="message" className="form-control" value={msg} ref={inputRef}  onChange={(e) => {
                  setMsg(e.target.value);
                }} ></textarea>

		<button type="submit" className="btn btn-primary mt-3 btn-lg" onClick={sendMessage}
                disabled={!connected}>Enviar Mensaje</button>
	</div>
	</form>
    </>
  );
};

export default Index;
