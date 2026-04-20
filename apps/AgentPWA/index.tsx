import React, { useState } from 'react';
import { Loader2, ExternalLink, AlertTriangle } from 'lucide-react';

interface AgentPWAProps {
  metadata?: {
    url?: string;
    agentName?: string;
    agentIcon?: string;
    agentRole?: string;
  };
}

const AgentPWA: React.FC<AgentPWAProps> = ({ metadata }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const url = metadata?.url;

  if (!url) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-black/95 text-white/60 p-8 gap-4">
        <AlertTriangle className="w-10 h-10 text-yellow-500/60" />
        <p className="text-sm font-mono tracking-widest uppercase">No URL configured</p>
        <p className="text-xs text-white/40 text-center">This agent does not have a deployment URL yet.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative bg-black">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/95 gap-4">
          <div className="relative">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm font-mono tracking-widest uppercase mb-1">
              {metadata?.agentName || 'Agent'} Loading
            </p>
            <p className="text-white/40 text-[10px] font-mono tracking-wider">{url}</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/95 gap-4 p-8">
          <AlertTriangle className="w-10 h-10 text-red-400/60" />
          <p className="text-white/80 text-sm font-mono tracking-widest uppercase">Connection Failed</p>
          <p className="text-white/40 text-xs text-center mb-4">
            Could not load {metadata?.agentName || 'this agent'}. The service may not be deployed yet.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white/80 text-xs font-mono tracking-widest transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            OPEN IN BROWSER
          </a>
        </div>
      )}

      {/* Agent iframe */}
      <iframe
        src={url}
        className="w-full h-full border-0"
        onLoad={() => setIsLoading(false)}
        onError={() => { setIsLoading(false); setHasError(true); }}
        allow="clipboard-write; microphone; camera"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        title={metadata?.agentName || 'Agent PWA'}
      />
    </div>
  );
};

export default AgentPWA;
