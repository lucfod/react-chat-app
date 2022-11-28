import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function MessageList() {
  const { messageList } = useContext(MessageContext);

  return (
    <div className="h-full p-10 border overflow-y-auto rounded-md shadow-md bg-neutral-100 mb-2">
      {messageList.map((msg, idx) => (
        <div
          key={idx}
          className={
            "flex " + (msg.from == "Me" ? "justify-end" : "justify-start")
          }
        >
          <div
            className={
              "p-4 rounded-md m-1 " +
              (msg.from == "Me" ? "bg-purple-100" : "bg-green-100")
            }
          >
            <p className="text-sm font-bold">{msg.from}:</p>
            <p>{msg.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
