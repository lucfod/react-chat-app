import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const MessageContext = createContext();

export function MessageContextProvider(props) {
  const socket = io("http://localhost:4000");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  function SendMessage(message) {
    socket.emit("message", message);
    const newMessage = {
      from: "Me",
      body: message,
    };
    setMessageList([...messageList, newMessage]);
    setMessage("");
  }

  useEffect(() => {
    const receiveMessage = (msg) => {
      console.log(msg);
      setMessageList([...messageList, msg]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messageList]);

  return (
    <MessageContext.Provider
      value={{ message, setMessage, messageList, SendMessage }}
    >
      {props.children}
    </MessageContext.Provider>
  );
}
