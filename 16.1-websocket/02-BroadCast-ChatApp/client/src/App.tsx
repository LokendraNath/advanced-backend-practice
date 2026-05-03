import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./components/Chat";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:groupId" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
