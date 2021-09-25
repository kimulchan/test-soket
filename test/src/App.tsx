import React from "react";
import { useEffect } from "react";
import SocketIoClient from "socket.io-client";

function App (){
  const socket = SocketIoClient("http://220.90.237.33:4900")
  
  return (
    <>

    </>
  );
}

export default App;