import { useState, useRef, useEffect } from "react";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  MessageCircle,
  CheckCheck,
  ArrowLeft,
  Smile,
} from "lucide-react";

const initialConversations = [
  {
    id: 1,
    name: "Abebe Kebede",
    role: "Full Stack Web Development Tutor",
    avatar: "AK",
    color: "bg-blue-100 text-blue-700",
    online: true,
    unread: 2,
    messages: [
      {
        id: 1,
        sender: "other",
        text: "Hello! How is your React learning going?",
        time: "09:30 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Hello Abebe! It is going well. I have completed the hooks lesson.",
        time: "09:35 AM",
      },
      {
        id: 3,
        sender: "other",
        text: "Excellent! Have you practiced useState and useEffect?",
        time: "09:37 AM",
      },
      {
        id: 4,
        sender: "other",
        text: "Please try building a small todo application before our next class.",
        time: "09:38 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Meron Tadesse",
    role: "UI/UX Design Tutor",
    avatar: "MT",
    color: "bg-purple-100 text-purple-700",
    online: true,
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "other",
        text: "I have shared the latest design materials.",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "me",
        text: "Thank you! I will review them.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    name: "Dawit Alemu",
    role: "Python Programming Tutor",
    avatar: "DA",
    color: "bg-green-100 text-green-700",
    online: false,
    unread: 1,
    messages: [
      {
        id: 1,
        sender: "other",
        text: "Remember to submit your Python assignment.",
        time: "Monday",
      },
    ],
  },
  {
    id: 4,
    name: "Helen Bekele",
    role: "Database Management Tutor",
    avatar: "HB",
    color: "bg-orange-100 text-orange-700",
    online: false,
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "other",
        text: "Next class we will discuss database relationships.",
        time: "Sunday",
      },
    ],
  },
];

export default function StudentMessages() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef(null);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeId,
  );

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  const selectConversation = (id) => {
    setActiveId(id);
    setShowMobileChat(true);

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: 0 } : conversation,
      ),
    );
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === activeId
          ? {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            }
          : conversation,
      ),
    );

    setMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Messages</h1>
        <p className="mt-1 text-sm text-slate-500">
          Communicate with your tutors and get learning support.
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex h-[calc(100vh-230px)] min-h-[550px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Conversation List */}
        <div
          className={`w-full border-r border-slate-200 md:w-80 lg:w-96 ${
            showMobileChat ? "hidden md:block" : "block"
          }`}
        >
          <div className="border-b border-slate-200 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                Conversations
              </h2>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {conversations.reduce((total, item) => total + item.unread, 0)}{" "}
                unread
              </span>
            </div>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="h-[calc(100%-105px)] overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <p className="p-6 text-center text-sm text-slate-500">
                No conversations found.
              </p>
            ) : (
              filteredConversations.map((conversation) => {
                const lastMessage =
                  conversation.messages[conversation.messages.length - 1];

                return (
                  <button
                    key={conversation.id}
                    onClick={() => selectConversation(conversation.id)}
                    className={`flex w-full items-center gap-3 border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${
                      activeId === conversation.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full font-bold ${conversation.color}`}
                      >
                        {conversation.avatar}
                      </div>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-sm font-semibold text-slate-800">
                          {conversation.name}
                        </h3>
                        <span className="shrink-0 text-xs text-slate-400">
                          {lastMessage?.time}
                        </span>
                      </div>
                      <p className="truncate text-xs text-slate-500">
                        {conversation.role}
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <p className="truncate text-sm text-slate-500">
                          {lastMessage?.sender === "me" ? "You: " : ""}
                          {lastMessage?.text}
                        </p>
                        {conversation.unread > 0 && (
                          <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 px-1 text-xs text-white">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div
          className={`min-w-0 flex-1 flex-col ${
            showMobileChat ? "flex" : "hidden md:flex"
          }`}
        >
          {activeConversation && (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 md:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    onClick={() => setShowMobileChat(false)}
                    className="text-slate-500 md:hidden"
                  >
                    <ArrowLeft size={22} />
                  </button>

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold ${activeConversation.color}`}
                  >
                    {activeConversation.avatar}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-slate-800">
                      {activeConversation.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {activeConversation.online ? (
                        <span className="text-green-600">● Online</span>
                      ) : (
                        "Offline"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3 text-slate-500">
                  <button title="Voice call" className="hidden sm:block">
                    <Phone size={19} />
                  </button>
                  <button title="Video call" className="hidden sm:block">
                    <Video size={20} />
                  </button>
                  <button title="More options">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/70 p-4 md:p-6">
                <div className="text-center">
                  <span className="rounded-full bg-white px-4 py-2 text-xs text-slate-400 shadow-sm">
                    Today
                  </span>
                </div>

                {activeConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm md:max-w-[70%] ${
                        msg.sender === "me"
                          ? "rounded-br-sm bg-blue-600 text-white"
                          : "rounded-bl-sm border border-slate-100 bg-white text-slate-700"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-6">
                        {msg.text}
                      </p>
                      <div
                        className={`mt-2 flex items-center justify-end gap-1 text-[10px] ${
                          msg.sender === "me"
                            ? "text-blue-100"
                            : "text-slate-400"
                        }`}
                      >
                        {msg.time}
                        {msg.sender === "me" && <CheckCheck size={13} />}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form
                onSubmit={sendMessage}
                className="flex items-center gap-2 border-t border-slate-200 bg-white p-3 md:gap-3 md:p-4"
              >
                <button
                  type="button"
                  title="Attach file"
                  className="hidden text-slate-400 transition hover:text-blue-600 sm:block"
                >
                  <Paperclip size={21} />
                </button>

                <button
                  type="button"
                  title="Emoji"
                  className="hidden text-slate-400 transition hover:text-blue-600 sm:block"
                >
                  <Smile size={21} />
                </button>

                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="min-w-0 flex-1 rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Send message"
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
