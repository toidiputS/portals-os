import React from "react";

const I_URL = "https://interpreter.itsai.help";

const IEmbed: React.FC = () => {
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
          href={I_URL}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Open I in a new tab
        </a>
      </div>

      {/* Iframe */}
      <iframe src={I_URL} className="flex-1 w-full border-0" title="I" />
    </div>
  );
};

export default IEmbed;
