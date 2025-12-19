import React from 'react';
import VoiceAssistantOverlay from '../../components/VoiceAssistantOverlay';

const OracleApp: React.FC = () => {
  return (
    <div className="h-full w-full bg-black">
      <VoiceAssistantOverlay embedded={true} />
    </div>
  );
};

export default OracleApp;
