import './App.css';
import { useState, useEffect } from "react"; 
import { message } from "antd";

import SignIn from "./Containers/SignIn";
import Room from "./Containers/Room";

const LOCALSTORAGE_KEY = "save-me";

const server = new WebSocket('ws://localhost:8787');
server.onopen = () => console.log('Server connected.');
server.sendEvent = (e) => server.send(JSON.stringify(e));

const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  
  const [signedIn, setSignedIn] = useState(false); 
  const [me, setMe] = useState(savedMe || "");
  const [room, setRoom] = useState("");
  
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg,
        duration: 1.5
      }
      switch(type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }
  
  useEffect(() => { 
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn]);

  return (
    <div className="App">
      {signedIn? (
      <Room 
        me={me} 
        room={room}
        server={server}
      />) : (
      <SignIn 
        me={me}
        room={room}
        setMe={setMe}
        setRoom={setRoom}
        setSignedIn={setSignedIn}  
        server={server}
        displayStatus={displayStatus} 
      />)}
    </div> 
  );
}

// <ChatRoom me={me} displayStatus={displayStatus} />

export default App;
