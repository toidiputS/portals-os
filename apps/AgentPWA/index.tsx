import React, { useState, useEffect, useRef } from 'react';
import { Loader2, ExternalLink, AlertTriangle, Wifi, WifiOff } from 'lucide-react';

interface AgentPWAProps {
  metadata?: {
    id?: string;
    url?: string;
    agentName?: string;
    agentIcon?: string;
    agentRole?: string;
  };
}

const AgentPWA: React.FC<AgentPWAProps> = ({ metadata }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const url = metadata?.url;

  // Signal READY to Kernel once loaded
  const handleLoad = () => {
    setIsLoading(false);
    setIsConnected(true);
    
    if (window.parent) {
      window.parent.postMessage({
        type: 'AGENT_READY',
        agentId: metadata?.id,
        agentName: metadata?.agentName,
        timestamp: new Date().toISOString()
      }, '*');
    }
  };

  // Heartbeat system
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      if (window.parent) {
        window.parent.postMessage({
          type: 'AGENT_HEARTBEAT',
          agentId: metadata?.id,
          timestamp: new Date().toISOString()
        }, '*');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isConnected, metadata?.id]);

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
    <div className="h-full w-full relative bg-black overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a14] gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full animate-pulse" />
            <Loader2 className="w-10 h-10 text-purple-400 animate-spin relative z-10" />
          </div>
          <div className="text-center relative z-10">
            <p className="text-white/80 text-sm font-black tracking-[0.2em] uppercase mb-2">
              ESTABLISHING UPLINK: {metadata?.agentName || 'AGENT'}
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-white/30 text-[10px] font-mono tracking-widest uppercase">{url.replace('https://', '')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Connection Status Mini-Badge */}
      {!isLoading && !hasError && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-2 py-1 rounded bg-black/60 border border-white/10 backdrop-blur-md opacity-0 hover:opacity-100 transition-opacity">
          <Wifi className="w-3 h-3 text-emerald-400" />
          <span className="text-[8px] font-mono text-emerald-400/80 uppercase tracking-tighter">SECURE CONNECTION</span>
        </div>
      )}

      {/* Error state */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a14] gap-6 p-8">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <WifiOff className="w-8 h-8 text-red-400/60" />
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm font-black tracking-widest uppercase mb-2">Connection Failed</p>
            <p className="text-white/40 text-[10px] font-mono text-center max-w-xs mx-auto uppercase tracking-wider leading-relaxed">
              Target subdomain {url} is unreachable. The agent may be undergoing maintenance or is not yet deployed.
            </p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/80 text-[10px] font-mono tracking-[0.2em] transition-all"
          >
            <ExternalLink className="w-3 h-3" />
            DIRECT ACCESS
          </a>
        </div>
      )}

      {/* Agent iframe */}
      <iframe
        ref={iframeRef}
        src={url}
        className="w-full h-full border-0"
        onLoad={handleLoad}
        onError={() => { setIsLoading(false); setHasError(true); setIsConnected(false); }}
        allow="clipboard-write; microphone; camera; midi; encrypted-media; geolocation"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        title={metadata?.agentName || 'Agent PWA'}
      />
    </div>
  );
};

export default AgentPWA;

