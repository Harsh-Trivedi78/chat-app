import React from "react";

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="w-1/4 bg-gradient-to-b from-blue-600 to-blue-800 h-full overflow-y-auto border-r text-white">
      <h2 className="text-xl font-extrabold p-6 bg-blue-700 border-b border-blue-500 shadow-lg">
        
      Let's Have Convo!
      </h2>
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className="p-4 cursor-pointer border-b border-blue-500 hover:bg-blue-700 hover:scale-105 transition-transform duration-200 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
            {chat.name[0]}
          </div>
          <div>
            <h3 className="text-md font-semibold">{chat.name}</h3>
            <p className="text-sm text-blue-300">{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
