import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");

  function sendMessage() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      alert("Socket is not Connected Yet!");
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    setSocket(ws);
    ws.onmessage = (ev) => {
      console.log(ev.data);
    };
  }, []);

  return (
    <>
      <h1>Hey This is Exmaple</h1>
      <input
        type="text"
        placeholder="Enter Message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </>
  );
}

export default App;
