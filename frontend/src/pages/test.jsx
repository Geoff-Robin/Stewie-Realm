import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus, Send, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "@/components/app-siderbar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function ChatPage() {
  const stewieGreetings = [
    "Ah, what fresh idiot dares enter my domain? Welcome to my realm of brilliance—prepare to be schooled by genius.",
    "Greetings, peon. Step into the world of superior intellect. Try not to embarrass yourself.",
    "Oh, splendid. You've arrived at the epicenter of genius. Brace yourself for a barrage of brilliance.",
    "At last, another wretched soul dares to challenge my supremacy. Welcome, though I doubt you'll keep up.",
    "Welcome, insignificant mortal. I trust you're ready for a lesson in genius, as I have little patience for the uninspired."
  ];
  
  function getRandomStewieGreeting() {
    const randomIndex = Math.floor(Math.random() * stewieGreetings.length);
    return stewieGreetings[randomIndex];
  }
  
  const [messages, setMessages] = useState([
    { id: 1, text: getRandomStewieGreeting(), sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: input, sender: "user" },
      ]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "I'm processing your message...",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] bg-background bg-opacity-80">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Stewie's Realm</h1>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col h-[calc(100vh-4rem)]">
          <ScrollArea className="flex-1 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
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
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="p-4 border-t bg-background">
            <div className="flex gap-2 max-w-4xl mx-auto">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
