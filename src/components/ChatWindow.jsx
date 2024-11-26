import React from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow = ({ chatId, chats, messages, onSendMessage }) => {
  // Find the current chat from the chats list
  const currentChat = chats.find((chat) => chat.id === chatId);

  return (
    <div className="flex flex-col flex-grow bg-white shadow-lg rounded-lg overflow-hidden">
      {chatId ? (
        <>
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
            <h3 className="text-2xl font-semibold">{currentChat.name}</h3>
            <p className="text-sm text-blue-100">
              Last online: {new Date(currentChat.lastOnline).toLocaleString()}
            </p>
          </div>

          {/* Chat Messages */}
          <div className="flex flex-col flex-grow p-4 bg-gray-50 overflow-y-auto space-y-4">
            {messages
              .filter((msg) => msg.chatId === chatId)
              .map((message, index) => (
                <MessageBubble
                  key={index}
                  text={message.message}
                  sender={message.sender}
                />
              ))}
          </div>

          {/* Message Input */}
          <div className="bg-gray-100 p-2 border-t border-gray-300 flex items-center">
            <MessageInput
              onSend={(msg) => onSendMessage(msg)}
              className="flex-1 bg-white rounded-full px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
