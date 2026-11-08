import { useEffect, useRef, useState } from "react";
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
  Image,
  Info,
  X,
} from "lucide-react";

const initialConversations = [
  {
    id: 1,
    name: "Abel Asres",
    email: "abel.asres@gmail.com",
    course: "Full Stack Web Development",
    avatar: "AA",
    online: true,
    unread: 2,
    messages: [
      {
        id: 1,
        sender: "student",
        text: "Hello teacher, I have a question about React hooks.",
        time: "09:30 AM",
      },
      {
        id: 2,
        sender: "tutor",
        text: "Hello Abel! Sure, what would you like to know?",
        time: "09:32 AM",
      },
      {
        id: 3,
        sender: "student",
        text: "I am confused about the useEffect dependency array.",
        time: "09:35 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Sara Bekele",
    email: "sara.bekele@gmail.com",
    course: "React.js for Beginners",
    avatar: "SB",
    online: true,
    unread: 1,
    messages: [
      {
        id: 1,
        sender: "student",
        text: "Thank you for the previous lesson!",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "tutor",
        text: "You're welcome, Sara. Keep practicing!",
        time: "Yesterday",
      },
      {
        id: 3,
        sender: "student",
        text: "I will submit my project today.",
        time: "10:15 AM",
      },
    ],
  },
  {
    id: 3,
    name: "Dawit Alemu",
    email: "dawit.alemu@gmail.com",
    course: "Python Programming",
    avatar: "DA",
    online: false,
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "tutor",
        text: "Please review the Python functions lesson.",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "student",
        text: "I have completed the exercises.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 4,
    name: "Meron Tadesse",
    email: "meron.tadesse@gmail.com",
    course: "Full Stack Web Development",
    avatar: "MT",
    online: false,
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "student",
        text: "Can you share the database notes?",
        time: "Monday",
      },
      {
        id: 2,
        sender: "tutor",
        text: "Yes, I will share them in the next lesson.",
        time: "Monday",
      },
    ],
  },
  {
    id: 5,
    name: "Yonas Girma",
    email: "yonas.girma@gmail.com",
    course: "Database Management",
    avatar: "YG",
    online: false,
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "student",
        text: "I need help understanding SQL joins.",
        time: "Sunday",
      },
    ],
  },
];

export default function TutorMessages() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId,
  );

  const filteredConversations = conversations.filter((conversation) =>
    `${conversation.name} ${conversation.course}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const unreadCount = conversations.reduce(
    (total, conversation) => total + conversation.unread,
    0,
  );

  const totalMessages = conversations.reduce(
    (total, conversation) => total + conversation.messages.length,
    0,
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId, conversations]);

  const openConversation = (id) => {
    setSelectedId(id);
    setMobileChatOpen(true);

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: 0 } : conversation,
      ),
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage || !selectedConversation) return;

    const newMessage = {
      id: Date.now(),
      sender: "tutor",
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedId
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Messages</h1>
        <p className="mt-1 text-sm text-slate-500">
          Communicate with your students and answer their questions.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Conversations"
          value={conversations.length}
          icon={MessageCircle}
          color="blue"
        />
        <StatCard
          title="Unread Messages"
          value={unreadCount}
          icon={Info}
          color="orange"
        />
        <StatCard
          title="Total Messages"
          value={totalMessages}
          icon={Send}
          color="purple"
        />
      </div>

      {/* Messaging Interface */}
      <div className="flex h-[680px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Conversation Sidebar */}
        <div
          className={`w-full flex-col border-r border-slate-200 md:flex md:w-[340px] md:shrink-0 ${
            mobileChatOpen ? "hidden" : "flex"
          }`}
        >
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-800">Conversations</h2>

            <div className="relative mt-4">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => {
              const lastMessage =
                conversation.messages[conversation.messages.length - 1];

              const active = selectedId === conversation.id;

              return (
                <button
                  key={conversation.id}
                  onClick={() => openConversation(conversation.id)}
                  className={`flex w-full items-start gap-3 border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${
                    active ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
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
                      <span className="shrink-0 text-[10px] text-slate-400">
                        {lastMessage?.time}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {conversation.course}
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-slate-500">
                        {lastMessage?.sender === "tutor" && "You: "}
                        {lastMessage?.text}
                      </p>

                      {conversation.unread > 0 && (
                        <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredConversations.length === 0 && (
              <p className="p-8 text-center text-sm text-slate-500">
                No conversations found.
              </p>
            )}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div
            className={`min-w-0 flex-1 flex-col ${
              mobileChatOpen ? "flex" : "hidden md:flex"
            }`}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 md:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={() => setMobileChatOpen(false)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="relative shrink-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    {selectedConversation.avatar}
                  </div>
                  {selectedConversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-bold text-slate-800">
                    {selectedConversation.name}
                  </h3>
                  <p className="truncate text-xs text-slate-500">
                    {selectedConversation.online ? "Online" : "Offline"} ·{" "}
                    {selectedConversation.course}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => alert("Voice calling will be available soon.")}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  title="Voice call"
                >
                  <Phone size={19} />
                </button>

                <button
                  onClick={() => alert("Video calling will be available soon.")}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  title="Video call"
                >
                  <Video size={20} />
                </button>

                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  title="Student information"
                >
                  <Info size={19} />
                </button>
              </div>
            </div>

            {/* Student Information */}
            {showInfo && (
              <div className="border-b border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-800">
                    Student Information
                  </h4>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="rounded-lg p-1 text-slate-500 hover:bg-slate-200"
                  >
                    <X size={17} />
                  </button>
                </div>

                <p className="mt-3 text-sm text-slate-700">
                  {selectedConversation.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedConversation.email}
                </p>
                <p className="mt-2 text-xs text-blue-600">
                  {selectedConversation.course}
                </p>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/70 p-4 md:p-6">
              <div className="text-center">
                <span className="rounded-full bg-white px-4 py-1.5 text-[11px] text-slate-400 shadow-sm">
                  Conversation started
                </span>
              </div>

              {selectedConversation.messages.map((item) => {
                const isTutor = item.sender === "tutor";

                return (
                  <div
                    key={item.id}
                    className={`flex ${
                      isTutor ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] ${
                        isTutor ? "items-end" : "items-start"
                      } flex flex-col`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                          isTutor
                            ? "rounded-br-sm bg-blue-600 text-white"
                            : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {item.text}
                      </div>

                      <div className="mt-1 flex items-center gap-1 px-1">
                        <span className="text-[10px] text-slate-400">
                          {item.time}
                        </span>

                        {isTutor && (
                          <CheckCheck size={13} className="text-blue-500" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-slate-100 bg-white p-4 md:p-5"
            >
              <div className="flex items-end gap-2">
                <div className="flex flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-blue-500">
                  <button
                    type="button"
                    onClick={() =>
                      alert("File attachments will be available soon.")
                    }
                    className="shrink-0 p-2 text-slate-400 hover:text-blue-600"
                    title="Attach file"
                  >
                    <Paperclip size={19} />
                  </button>

                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message..."
                    className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      alert("Emoji picker will be available soon.")
                    }
                    className="shrink-0 p-2 text-slate-400 hover:text-blue-600"
                    title="Emoji"
                  >
                    <Smile size={19} />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send size={19} />
                </button>
              </div>

              <p className="mt-2 text-center text-[10px] text-slate-400">
                Press the send button to send your message.
              </p>
            </form>
          </div>
        ) : (
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="text-center">
              <MessageCircle
                size={48}
                className="mx-auto mb-4 text-slate-300"
              />
              <h3 className="font-semibold text-slate-700">
                Select a conversation
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Choose a student to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`rounded-xl p-3 ${colors[color]}`}>
          <Icon size={21} />
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  );
}
