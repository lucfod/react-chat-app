import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

type TMessage = {
  from: string;
  body: string;
};

interface IMessageContext {
  message: string;
  setMessage: (message: string) => void;
  messageList: TMessage[];
  SendMessage: (message: string) => void;
}

export const MessageContext = createContext<IMessageContext>({
  message: "",
  setMessage: () => {
    return;
  },
  messageList: [],
  SendMessage: () => {
    return;
  },
});

export function MessageContextProvider({ children }: { children: any }) {
  const socket = io("http://localhost:4000");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<TMessage[]>([]);

  function SendMessage(message: string) {
    socket.emit("message", message);
    const newMessage: TMessage = {
      from: "Me",
      body: message,
    };
    setMessageList([...messageList, newMessage]);
    setMessage("");
  }

  useEffect(() => {
    const receiveMessage = (msg: TMessage) => {
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
      {children}
    </MessageContext.Provider>
  );
}
