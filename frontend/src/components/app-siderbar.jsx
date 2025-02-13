"use client";
import * as React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { MessageSquare, Plus, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

function ChatList({ items }) {
  return (
    <nav className="space-y-1">
      {items.map((chat) => (
        <Button
          key={chat.title}
          variant={chat.isActive ? "secondary" : "ghost"}
          className="w-full justify-start"
        >
          <chat.icon className="mr-2 h-4 w-4" />
          <span className="text-sm">{chat.title}</span>
        </Button>
      ))}
    </nav>
  );
}

export function AppSidebar(props) {
  const { getAccessTokenSilently } = useAuth0();
  // Initialize chatIDs state from localStorage or default to an empty array.
  const [chatIDs, setChatIDs] = React.useState(() => {
    const stored = localStorage.getItem("chat_id");
    return stored ? JSON.parse(stored) : [];
  });

  // useEffect to fetch the chat list from the API.
  React.useEffect(() => {
    async function fetchChatList() {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.post(
          "http://localhost:3000/chat/chatlist",
          { email: "something@gmail.com" },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Assume the response data has a chat_id array.
        localStorage.setItem("chat_id", JSON.stringify(response.data.chat_id));
        setChatIDs(response.data.chat_id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Chat list not found; initialize chat_id as an empty array.
          localStorage.setItem("chat_id", JSON.stringify([]));
          setChatIDs([]);
        } else {
          console.error("Error fetching chat list:", error);
        }
      }
    }

    fetchChatList();
  }, [chatIDs, getAccessTokenSilently]); // Re-run when chatIDs changes

  // Build dynamic chat items from chatIDs.
  const chatItems = chatIDs.map((id) => ({
    title: `App ${id}`,
    url: "#",
    icon: MessageSquare,
    isActive: false,
  }));

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Button className="gap-2">
          <Plus size={16} /> New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <ChatList items={chatItems} />
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LogOut size={16} /> Logout
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
