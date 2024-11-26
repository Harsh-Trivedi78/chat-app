import React from "react";

const MessageBubble = ({ text, sender }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800 border border-gray-300"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
