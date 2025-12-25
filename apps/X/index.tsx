import React from "react";

const X_URL = "https://x-ray.itsai.vip";

const XEmbed: React.FC = () => {
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
          href={X_URL}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Open X in a new tab
        </a>
      </div>

      {/* Iframe */}
      <iframe src={X_URL} className="flex-1 w-full border-0" title="X" />
    </div>
  );
};

export default XEmbed;
