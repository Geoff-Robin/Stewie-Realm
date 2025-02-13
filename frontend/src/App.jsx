import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/landingPage";
import ChatPage from "./pages/chatPage";
import Auth0ProviderWithNavigate from "./context/auth0Provider";

function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}

export default App;
