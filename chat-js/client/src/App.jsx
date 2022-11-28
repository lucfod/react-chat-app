import "./App.css";
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";

function App() {
  return (
    <div className="overflow-hidden bg-gray-200">
      <div className="container px-32 m-auto">
        <div className="py-6 h-screen">
          <div className="flex flex-col h-full">
            <MessageList />
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
