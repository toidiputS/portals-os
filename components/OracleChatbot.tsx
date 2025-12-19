import React, { useState } from 'react';

const ORACLE_URL = "https://oracle.itsyouonline.com/";

const OracleChatbot: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 ${isMinimized ? 'w-[60px] h-[60px]' : 'w-[400px] h-[600px]'}`}
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
          title="Chat with Oracle"
        >
          🧙‍♀️
        </button>
      ) : (
        <div className="bg-black border border-gray-700 rounded-lg shadow-2xl flex flex-col">
          <div className="flex justify-between items-center p-2 border-b border-gray-700">
            <span className="text-white font-semibold">Oracle</span>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <iframe
            src={ORACLE_URL}
            className="flex-1 w-full border-0 rounded-b-lg"
            title="Oracle Chatbot"
          />
        </div>
      )}
    </div>
  );
};

export default OracleChatbot;
