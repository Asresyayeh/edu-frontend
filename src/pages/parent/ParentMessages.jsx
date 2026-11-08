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
  Info,
  X,
  User,
  BookOpen,
} from "lucide-react";

const initialConversations = [
  {
    id: 1,
    tutor: "Abebe Kebede",
    subject: "Mathematics Tutor",
    child: "Abel Asres",
    avatar: "AK",
    color: "bg-blue-100 text-blue-700",
    online: true,
    unread: 2,
    lastMessage: "Abel is making excellent progress!",
    time: "10:30 AM",
    messages: [
      {
        id: 1,
        sender: "tutor",
        text: "Hello! I wanted to share Abel's recent progress in Mathematics.",
        time: "09:15 AM",
      },
      {
        id: 2,
        sender: "parent",
        text: "Hello Abebe! How is he doing with the recent lessons?",
        time: "09:20 AM",
      },
      {
        id: 3,
        sender: "tutor",
        text: "He is doing very well, especially with algebra and equations.",
        time: "09:45 AM",
      },
      {
        id: 4,
        sender: "tutor",
        text: "Abel is making excellent progress!",
        time: "10:30 AM",
      },
    ],
  },
  {
    id: 2,
    tutor: "Hana Mohammed",
    subject: "English Tutor",
    child: "Sara Asres",
    avatar: "HM",
    color: "bg-pink-100 text-pink-700",
    online: true,
    unread: 1,
    lastMessage: "Please encourage her to read daily.",
    time: "Yesterday",
    messages: [
      {
        id: 1,
        sender: "tutor",
        text: "Good afternoon! Sara has been doing well in English.",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "parent",
        text: "That's wonderful. What should she improve?",
        time: "Yesterday",
      },
      {
        id: 3,
        sender: "tutor",
        text: "Please encourage her to read daily.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    tutor: "Meron Tadesse",
    subject: "Physics Tutor",
    child: "Abel Asres",
    avatar: "MT",
    color: "bg-purple-100 text-purple-700",
    online: false,
    unread: 0,
    lastMessage: "The next lesson will cover electricity.",
    time: "Nov 6",
    messages: [
      {
        id: 1,
        sender: "tutor",
        text: "We completed the introduction to mechanics.",
        time: "Nov 6",
      },
      {
        id: 2,
        sender: "parent",
        text: "Thank you for the update.",
        time: "Nov 6",
      },
      {
        id: 3,
        sender: "tutor",
        text: "The next lesson will cover electricity.",
        time: "Nov 6",
      },
    ],
  },
  {
    id: 4,
    tutor: "Dawit Alemu",
    subject: "Biology Tutor",
    child: "Sara Asres",
    avatar: "DA",
    color: "bg-orange-100 text-orange-700",
    online: false,
    unread: 0,
    lastMessage: "I have shared the assignment.",
    time: "Nov 5",
    messages: [
      {
        id: 1,
        sender: "parent",
        text: "How is Sara performing in Biology?",
        time: "Nov 5",
      },
      {
        id: 2,
        sender: "tutor",
        text: "She is improving. I have shared the assignment.",
        time: "Nov 5",
      },
    ],
  },
];

export default function ParentMessages() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(1);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const messagesEndRef = useRef(null);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId,
  );

  const filteredConversations = conversations.filter((conversation) => {
    const search = searchTerm.toLowerCase();

    return (
      conversation.tutor.toLowerCase().includes(search) ||
      conversation.subject.toLowerCase().includes(search) ||
      conversation.child.toLowerCase().includes(search)
    );
  });

  const totalUnread = conversations.reduce(
    (sum, conversation) => sum + conversation.unread,
    0,
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [selectedId, conversations]);

  const openConversation = (id) => {
    setSelectedId(id);
    setShowMobileChat(true);

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: 0 } : conversation,
      ),
    );
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedConversation) return;

    const newMessage = {
      id: Date.now(),
      sender: "parent",
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              messages: [...conversation.messages, newMessage],
              lastMessage: newMessage.text,
              time: "Just now",
            }
          : conversation,
      ),
    );

    setMessage("");
  };

  const handleAttachment = () => {
    alert("File attachment will be available after backend integration.");
  };

  const handleCall = (type) => {
    alert(`${type} calling will be available after integration.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="mt-1 text-sm text-gray-500">
          Communicate with your children's tutors and stay informed.
        </p>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Conversations"
          value={conversations.length}
          icon={MessageCircle}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          label="Unread Messages"
          value={totalUnread}
          icon={MessageCircle}
          color="text-orange-600"
          bg="bg-orange-50"
        />
        <StatCard
          label="Online Tutors"
          value={conversations.filter((c) => c.online).length}
          icon={User}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
      </div>

      {/* Messaging Interface */}
      <div className="flex h-[680px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Conversation Sidebar */}
        <div
          className={`w-full flex-col border-r border-gray-100 md:w-80 lg:w-96 ${
            showMobileChat ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="border-b border-gray-100 p-5">
            <h2 className="text-lg font-bold text-gray-900">Conversations</h2>

            <div className="relative mt-4">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search tutors or children..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-600"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => openConversation(conversation.id)}
                className={`flex w-full items-start gap-3 border-b border-gray-50 p-4 text-left transition hover:bg-gray-50 ${
                  selectedId === conversation.id ? "bg-blue-50/70" : ""
                }`}
              >
                <div className="relative shrink-0">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${conversation.color}`}
                  >
                    {conversation.avatar}
                  </div>

                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-gray-900">
                      {conversation.tutor}
                    </h3>
                    <span className="shrink-0 text-xs text-gray-400">
                      {conversation.time}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-xs text-brand-600">
                    {conversation.subject} · {conversation.child}
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p className="truncate text-xs text-gray-500">
                      {conversation.lastMessage}
                    </p>

                    {conversation.unread > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 px-1.5 text-xs font-bold text-white">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {filteredConversations.length === 0 && (
              <div className="p-8 text-center">
                <MessageCircle
                  size={32}
                  className="mx-auto mb-3 text-gray-300"
                />
                <p className="text-sm text-gray-500">No conversations found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={`min-w-0 flex-1 flex-col ${
            showMobileChat ? "flex" : "hidden md:flex"
          }`}
        >
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-gray-100 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    onClick={() => setShowMobileChat(false)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
                  >
                    <ArrowLeft size={20} />
                  </button>

                  <div className="relative shrink-0">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${selectedConversation.color}`}
                    >
                      {selectedConversation.avatar}
                    </div>
                    {selectedConversation.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-900">
                      {selectedConversation.tutor}
                    </h3>
                    <p className="truncate text-xs text-gray-500">
                      {selectedConversation.online ? "Online" : "Offline"} ·{" "}
                      {selectedConversation.subject}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => handleCall("Audio")}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    title="Audio call"
                  >
                    <Phone size={18} />
                  </button>
                  <button
                    onClick={() => handleCall("Video")}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    title="Video call"
                  >
                    <Video size={19} />
                  </button>
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    title="Conversation information"
                  >
                    <Info size={19} />
                  </button>
                  <button
                    className="hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 sm:block"
                    title="More options"
                  >
                    <MoreVertical size={19} />
                  </button>
                </div>
              </div>

              {/* Child Information */}
              {showInfo && (
                <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-center gap-3">
                    <BookOpen size={20} className="text-brand-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {selectedConversation.child}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedConversation.subject}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setShowInfo(false)}>
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 space-y-5 overflow-y-auto bg-gray-50/50 p-4 sm:p-6">
                <div className="text-center">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                    Conversation history
                  </span>
                </div>

                {selectedConversation.messages.map((msg) => {
                  const isParent = msg.sender === "parent";

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isParent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                          isParent
                            ? "rounded-br-sm bg-brand-600 text-white"
                            : "rounded-bl-sm border border-gray-100 bg-white text-gray-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {msg.text}
                        </p>

                        <div
                          className={`mt-2 flex items-center justify-end gap-1 text-[10px] ${
                            isParent ? "text-blue-100" : "text-gray-400"
                          }`}
                        >
                          {msg.time}
                          {isParent && <CheckCheck size={14} />}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form
                onSubmit={sendMessage}
                className="border-t border-gray-100 bg-white p-4"
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAttachment}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-brand-600"
                    title="Attach file"
                  >
                    <Paperclip size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setMessage((prev) => prev + " 😊")}
                    className="hidden rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-brand-600 sm:block"
                    title="Add emoji"
                  >
                    <Smile size={20} />
                  </button>

                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
                  />

                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>

                <p className="mt-2 text-center text-xs text-gray-400">
                  Messages are currently stored in temporary demo state.
                </p>
              </form>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <MessageCircle size={48} className="mb-4 text-gray-300" />
              <h3 className="font-semibold text-gray-800">
                Select a conversation
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Choose a tutor to view your messages.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${color}`}
        >
          <Icon size={23} />
        </div>
      </div>
    </div>
  );
}
