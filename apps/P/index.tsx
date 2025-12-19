import React from 'react';

const P_URL = "https://p.itsai.life";

const PEmbed: React.FC = () => {
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
          href={P_URL}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Open P in a new tab
        </a>
      </div>

      {/* Iframe */}
      <iframe
        src={P_URL}
        className="flex-1 w-full border-0"
        title="P"
      />
    </div>
  );
};

export default PEmbed;
