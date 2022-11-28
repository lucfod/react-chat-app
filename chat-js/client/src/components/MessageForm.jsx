import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function MessageForm() {
  const { message, setMessage, SendMessage } = useContext(MessageContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    SendMessage(message);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="w-full border-2 rounded-md py-2 pl-8 mr-2 text-sm shadow-md focus:outline-none focus:border-purple-400"
        />
        <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple">
          Send
        </button>
      </form>
    </>
  );
}

export default MessageForm;
