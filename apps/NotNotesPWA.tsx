import React from 'react';
import AgentPWA from './AgentPWA';

const NotNotesPWA: React.FC = () => {
    return (
        <AgentPWA 
            metadata={{ 
                url: "https://notnotes.itsyouonline.com",
                agentName: "Not Notes",
                agentRole: "Rich note-taking PWA"
            }} 
        />
    );
};

export default NotNotesPWA;
