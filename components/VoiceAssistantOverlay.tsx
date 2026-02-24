import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKernel } from '../store/kernel';
import { generateOracleResponse, summarizeOracleHistory, generateOracleTitle } from '../services/oracleService';
import { ChatMessage, AppId } from '../types';
import { APPS } from '../apps.config';

interface VoiceAssistantOverlayProps {
    embedded?: boolean;
}

const VoiceAssistantOverlay: React.FC<VoiceAssistantOverlayProps> = ({ embedded = false }) => {
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const gemini = useKernel(state => state.gemini);
    const addMessageToSession = useKernel(state => state.addMessageToSession);
    const startNewChat = useKernel(state => state.startNewChat);
    const updateSessionTitle = useKernel(state => state.updateSessionTitle);
    const openWindow = useKernel(state => state.openWindow);
    const openFile = useKernel(state => state.openFile);

    const handleSend = async () => {
        if (!input.trim() || isProcessing) return;

        const userInput = input;
        setInput('');
        setIsProcessing(true);

        try {
            let sessionId = gemini.currentSessionId;
            if (!sessionId) {
                sessionId = startNewChat();
            }

            const userMessage: ChatMessage = { role: 'user', content: userInput };
            addMessageToSession(sessionId, userMessage);

            const currentSession = gemini.sessions[sessionId];
            const historyForAPI: ChatMessage[] = gemini.useSmartContext && currentSession.messages.length > 1
                ? [{ role: 'user', content: await summarizeOracleHistory(currentSession.messages) }, userMessage]
                : [...currentSession.messages, userMessage];

            const { text: responseText, groundingChunks, functionCalls } = await generateOracleResponse(
                userInput,
                'gemini-1.5-flash',
                historyForAPI,
                false
            );

            let executedActions: string[] = [];
            if (functionCalls && functionCalls.length > 0) {
                for (const fc of functionCalls) {
                    if (fc.name === 'openWindow') {
                        const { appId } = fc.args;
                        if (appId && APPS.some(app => app.id === appId)) {
                            openWindow(appId);
                            const appName = APPS.find(app => app.id === appId)?.name || appId;
                            executedActions.push(`Opening ${appName}`);
                        }
                    } else if (fc.name === 'openFile') {
                        const { fileId } = fc.args;
                        if (fileId) {
                            openFile(fileId);
                            executedActions.push(`Opening file: ${fileId}`);
                        }
                    }
                }
            }

            let finalResponse = responseText || '';
            if (!finalResponse && executedActions.length > 0) {
                finalResponse = `${executedActions.join('. ')}. Systems updated.`;
            }
            if (!finalResponse && (!functionCalls || functionCalls.length === 0)) {
                finalResponse = "The connection is weak here... I cannot reach the nexus.";
            }

            if (finalResponse) {
                const teleportMatch = finalResponse.match(/\[TELEPORT\s*->\s*([A-Z])\]/i);
                if (teleportMatch) {
                    const agentLetter = teleportMatch[1].toLowerCase();
                    if (APPS.some(app => app.id === agentLetter)) {
                        openWindow(agentLetter as AppId);
                    }
                }

                const modelMessage: ChatMessage = { role: 'model', content: finalResponse, groundingChunks };
                addMessageToSession(sessionId, modelMessage);
            }

            if (currentSession.messages.length <= 2) {
                const newTitle = await generateOracleTitle([userMessage, { role: 'model', content: responseText || '' }]);
                updateSessionTitle(sessionId, newTitle);
            }
        } catch (error) {
            console.error("Error in oracle chat:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (embedded) {
        return (
            <div className="w-full h-full flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-linear-to-r from-purple-900/20 to-blue-900/20">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">Oracle Core Nexus</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Embedded mode can just rely on looking at store if needed, but here we don't render them gracefully without hooks so we rely on the parent app for UI in full window. Actually this component handles UI for embedded too. But to cleanly split it, let's keep it minimal since Oracle App has its own message renderer. Wait! Oracle has its own chat map inside `app/Oracle/index.tsx` maybe? I'll leave this empty or minimal. Actually, looking back, the embedded mode here was rendering bubbles too, but now we just render a simple command line if it's rendered embedded here. I'll just use the pill. */}
                    <div className="text-center text-purple-400/50 mt-10">
                        Connection established. Oracle Nexus awaiting command.
                    </div>
                </div>

                <div className="p-4 border-t border-purple-500/20">
                    <div className="relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                            placeholder={isProcessing ? "Oracle is compiling..." : "Talk to Oracle..."}
                            disabled={isProcessing}
                            className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg p-4 pr-14 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 text-sm min-h-[50px] max-h-32"
                            rows={2}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isProcessing}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition-colors"
                        >
                            <Send size={16} className={isProcessing ? "animate-pulse" : ""} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="oracle-nexus-container z-10000">
            {/* Input - Floating Pill */}
            <div className={`fixed bottom-24 right-6 transition-all duration-300 ${isChatOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95 origin-bottom-right'}`}>
                <div className="w-[300px] bg-black/90 backdrop-blur-xl rounded-full p-1 flex items-center gap-2 border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                        placeholder={isProcessing ? "Oracle is compiling..." : "Talk to Oracle..."}
                        disabled={isProcessing}
                        className="flex-1 bg-transparent border-none px-5 py-2.5 focus:ring-0 text-white placeholder-purple-300/40 text-sm h-full rounded-l-full outline-none"
                        autoFocus={isChatOpen}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isProcessing}
                        className="p-2 mr-1 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:shadow-none transition-all pointer-events-auto"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>

            {/* The Oracle Corner Button */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`
                    fixed -bottom-10 -right-10 pointer-events-auto flex flex-col items-center justify-center 
                    w-24 h-24 rounded-full bg-black/80 backdrop-blur-xl border border-purple-500/40
                    shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:bg-purple-900/60
                    transition-all duration-300 overflow-hidden group
                    ${isChatOpen ? 'bg-purple-900/80 shadow-[0_0_60px_rgba(168,85,247,0.8)] scale-105' : ''}
                `}
            >
                <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-purple-500/30 group-hover:bg-purple-400/50 blur-sm animate-pulse" />
                <div className="relative -top-2 -left-2 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(168,85,247,1)]" />
            </button>
        </div>
    );
};

export default VoiceAssistantOverlay;

