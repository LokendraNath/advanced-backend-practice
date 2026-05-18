import { ArrowBigUpDash, LucideStepBack } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChatPage = () => {
  const [messages, setMessages] = useState(["Hello EveryOne", "Ya Hello"]);
  const [inputMessage, setInputMessage] = useState("");
  const wsRef = useRef();
  const navigate = useNavigate();
  const { groupId } = useParams();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: groupId,
          },
        }),
      );
    };

    return () => {
      ws.close();
    };
  }, [groupId]);

  function handleMessageSend() {
    const strData = JSON.stringify({
      type: "chat",
      payload: {
        message: inputMessage,
      },
    });
    wsRef.current.send(strData);
    setInputMessage("");
  }

  return (
    <div className="relative h-screen bg-black text-white">
      <div className="pt-10 px-30 flex flex-col gap-4">
        {messages.map((m) => {
          return (
            <div key={m}>
              <span className="bg-gray-600 px-3 text-[16px] py-2 rounded-lg">
                {m}
              </span>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-3 left-100 right-100 border-white bg-gray-800 py-2 px-4 rounded-2xl flex justify-between">
        <button className="cursor-pointer" onClick={() => navigate("/")}>
          <LucideStepBack />
        </button>
        <input
          type="text"
          placeholder="Write Your Message"
          value={inputMessage}
          className="text-[16px] border-none outline-none"
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleMessageSend()}
        />
        <button
          className="bg-blue-700 rounded-full p-1"
          onClick={() => handleMessageSend()}
        >
          <ArrowBigUpDash className="text-white text-lg" />
        </button>
      </div>
    </div>
  );
};
export default ChatPage;
