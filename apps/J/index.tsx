import React from 'react';

const J_URL = "https://j.itsai.chat";

const JEmbed: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col bg-black text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <a
          href="/"
          className="text-blue-400 hover:text-blue-300 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            // Since no routing, perhaps close the window or go back
            // For now, just prevent default
          }}
        >
          ← Back
        </a>
        <a
          href={J_URL}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Open J in a new tab
        </a>
      </div>

      {/* Iframe */}
      <iframe
        src={J_URL}
        className="flex-1 w-full border-0"
        title="J"
      />
    </div>
  );
};

export default JEmbed;
