import React from 'react';

const Y_URL = "https://y.itsai.services";

const YEmbed: React.FC = () => {
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
          href={Y_URL}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Open Y in a new tab
        </a>
      </div>

      {/* Iframe */}
      <iframe
        src={Y_URL}
        className="flex-1 w-full border-0"
        title="Y"
      />
    </div>
  );
};

export default YEmbed;
