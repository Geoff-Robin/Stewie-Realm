"use client";
import React, { useState, useEffect, useRef } from "react";
import { HfInference } from "@huggingface/inference";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth0 } from "@auth0/auth0-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

// Instantiate the Hugging Face Inference client using your API key.
const hf = new HfInference(import.meta.env.VITE_HF_API_KEY);

export default function ChatPage() {
  const { user, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Redirect to "/" if not authenticated.
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // On mount, load messages from sessionStorage.
  useEffect(() => {
    const storedMessages = sessionStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Scroll to bottom and update sessionStorage whenever messages change.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Function to call the Hugging Face Inference API using chatCompletionStream.
  const callInferenceAPI = async (prompt) => {
    try {
      // Build conversation history with system prompt to enforce Stewie's persona.
      const systemMessage = {
        role: "system",
        content:
          "You are Stewie Griffin from Family Guy. You are highly intelligent, sarcastic, and condescending. Always respond with wit, British slang, and a touch of villainous charm.",
      };
      const conversationHistory = [
        systemMessage,
        { role: "user", content: prompt },
      ];
      const stream = hf.chatCompletionStream({
        model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
        messages: conversationHistory,
        max_tokens: 500,
      });
      let out = "";
      for await (const chunk of stream) {
        if (chunk.choices && chunk.choices.length > 0) {
          const newContent = chunk.choices[0].delta.content;
          out += newContent;
        }
      }
      // Remove everything after "</think>" if present.
      const thinkIndex = out.indexOf("</think>");
      if (thinkIndex !== -1) {
        out = out.slice(thinkIndex + 8).trim();
      }
      return out;
    } catch (error) {
      console.error("Error in inference call:", error);
      return "Error: Could not get response from bot.";
    }
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = input;
      // Append the user's message.
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: userMessage, sender: "user" },
      ]);
      setInput("");
      setIsLoading(true);

      // Call the Hugging Face chatCompletion function.
      const botResponse = await callInferenceAPI(userMessage);
      // Append the bot's response.
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: botResponse, sender: "bot" },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b px-4 bg-background">
        <h1 className="text-xl font-semibold">Stewie's Realm</h1>
        <Button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </Button>
      </header>

      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <Skeleton className="w-[300px] h-[40px] rounded-full" />
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
