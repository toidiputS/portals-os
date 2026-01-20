import React, { useState, useEffect } from 'react';
import { Volume2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKernel } from '../store/kernel';
import { GlowCard } from './GlowCard';
import { generateOracleResponse, summarizeOracleHistory, generateOracleTitle } from '../services/oracleService';
import { registerBubbleCallback, unregisterBubbleCallback, showSpeechBubble } from './speechBubbleUtils';
import { ChatMessage, AppId } from '../types';
import { APPS } from '../apps.config';

interface SpeechBubble {
    id: string;
    text: string;
    timestamp: number;
}

interface VoiceAssistantOverlayProps {
    embedded?: boolean;
}

const VoiceAssistantOverlay: React.FC<VoiceAssistantOverlayProps> = ({ embedded = false }) => {
    const [bubbles, setBubbles] = useState<SpeechBubble[]>([]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const gemini = useKernel(state => state.gemini);
    const addMessageToSession = useKernel(state => state.addMessageToSession);
    const startNewChat = useKernel(state => state.startNewChat);
    const updateSessionTitle = useKernel(state => state.updateSessionTitle);
    const openWindow = useKernel(state => state.openWindow);
    const openFile = useKernel(state => state.openFile);

    useEffect(() => {
        // Register callback for adding bubbles
        registerBubbleCallback((text: string) => {
            const bubble: SpeechBubble = {
                id: `bubble-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                text,
                timestamp: Date.now(),
            };

            setBubbles(prev => [...prev, bubble]);

            // Auto-remove after 8 seconds (longer for reading)
            setTimeout(() => {
                setBubbles(prev => prev.filter(b => b.id !== bubble.id));
            }, 8000);
        });

        return () => {
            unregisterBubbleCallback();
        };
    }, []);

    const handleSend = async () => {
        if (!input.trim() || isProcessing) return;

        const userInput = input;
        setInput('');
        setIsProcessing(true);

        // Show user message as a bubble immediately
        showSpeechBubble(userInput);

        try {
            // Ensure session exists
            let sessionId = gemini.currentSessionId;
            if (!sessionId) {
                sessionId = startNewChat();
            }

            // Add user message to store
            const userMessage: ChatMessage = { role: 'user', content: userInput };
            addMessageToSession(sessionId, userMessage);

            // Get current session for context
            const currentSession = gemini.sessions[sessionId];
            const historyForAPI: ChatMessage[] = gemini.useSmartContext && currentSession.messages.length > 1
                ? [{ role: 'user', content: await summarizeOracleHistory(currentSession.messages) }, userMessage]
                : [...currentSession.messages, userMessage];

            // Call API
            const { text: responseText, groundingChunks, functionCalls } = await generateOracleResponse(
                userInput,
                'gemini-1.5-flash',
                historyForAPI,
                false
            );

            // Handle Function Calls
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

            // Handle Text Response
            let finalResponse = responseText || '';

            // If model returned no text but executed actions, create a fallback response
            if (!finalResponse && executedActions.length > 0) {
                finalResponse = `${executedActions.join('. ')}. What else can I illuminate for you?`;
            }

            // If still no response at all, use a fallback
            if (!finalResponse && (!functionCalls || functionCalls.length === 0)) {
                finalResponse = "I sense your presence, but the pathways are unclear. Tell me more about your challenge...";
            }

            if (finalResponse) {
                // Parse TELEPORT commands
                const teleportMatch = finalResponse.match(/\[TELEPORT\s*->\s*([A-Z])\]/i);
                if (teleportMatch) {
                    const agentLetter = teleportMatch[1].toLowerCase();
                    if (APPS.some(app => app.id === agentLetter)) {
                        openWindow(agentLetter as AppId);
                    }
                }

                const modelMessage: ChatMessage = { role: 'model', content: finalResponse, groundingChunks };
                addMessageToSession(sessionId, modelMessage);
                showSpeechBubble(finalResponse);
            }

            // Generate Title if new chat
            if (currentSession.messages.length <= 2) {
                const newTitle = await generateOracleTitle([userMessage, { role: 'model', content: responseText || '' }]);
                updateSessionTitle(sessionId, newTitle);
            }
        } catch (error) {
            console.error("Error in overlay chat:", error);
            showSpeechBubble("Sorry, I encountered an error. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const [isChatOpen, setIsChatOpen] = useState(false);

    // Idle "Wandering" Logic
    const [isIdle, setIsIdle] = useState(false);
    const [wanderPos, setWanderPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let idleTimer: NodeJS.Timeout;
        let wanderInterval: NodeJS.Timeout;

        const onUserActivity = () => {
            setIsIdle(false);
            setWanderPos({ x: 0, y: 0 }); // Snap home
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => setIsIdle(true), 10000); // 10s idle trigger
        };

        // Initial setup
        idleTimer = setTimeout(() => setIsIdle(true), 5000);

        window.addEventListener('mousemove', onUserActivity);
        window.addEventListener('keydown', onUserActivity);
        window.addEventListener('click', onUserActivity);

        return () => {
            window.removeEventListener('mousemove', onUserActivity);
            window.removeEventListener('keydown', onUserActivity);
            window.removeEventListener('click', onUserActivity);
            clearTimeout(idleTimer);
        };
    }, []);

    useEffect(() => {
        if (isIdle && !isChatOpen) {
            // Wander logic
            const moveOrb = () => {
                // Random position within safe generic screen bounds relative to bottom-right
                // Range: -screenW+100 to 0 (x), -screenH+100 to 0 (y)
                // We keep it somewhat contained to not get lost.
                const boundsX = Math.min(window.innerWidth - 200, 800);
                const boundsY = Math.min(window.innerHeight - 200, 600);

                const rx = -(Math.random() * boundsX);
                const ry = -(Math.random() * boundsY);
                setWanderPos({ x: rx, y: ry });
            };

            // Initial move immediately upon becoming idle
            moveOrb();

            // Move every 6-10 seconds
            const interval = setInterval(moveOrb, 8000);
            return () => clearInterval(interval);
        } else {
            setWanderPos({ x: 0, y: 0 });
        }
    }, [isIdle, isChatOpen]);

    if (embedded) {
        // ... (existing embedded return remains same, skipping for brevity in thought process but including in response? No, tool allows partial)
        // Actually, this tool is "replace_file_content". If I replace component body, I must include embedded block.
        // I will target the lines *after* embedded block to insert logic, and then *replace* the final return.
        // Wait, hook logic must be at top level.
        // I will use `multi_replace_file_content` or just insert hooks at top and replace return at bottom.
        // Let's use `multi_replace_file_content` for cleanliness.
        return (
            <div className="w-full h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-linear-to-r from-purple-900/20 to-blue-900/20">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">ONE</span>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence initial={false}>
                        {bubbles.map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start"
                            >
                                <div className="max-w-[80%] p-4 rounded-lg text-sm bg-purple-900/50 text-purple-100 border border-purple-500/20 rounded-bl-sm">
                                    <p className="mb-2 last:mb-0">{msg.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-purple-500/20">
                    <div className="relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                            placeholder={isProcessing ? "ONE is contemplating..." : "Ask ONE anything..."}
                            disabled={isProcessing}
                            className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg p-4 pr-14 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 text-sm min-h-[50px] max-h-32 disabled:opacity-50 disabled:cursor-wait"
                            rows={2}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isProcessing}
                            aria-label="Send message"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={16} className={isProcessing ? "animate-pulse" : ""} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Speed Bump Button - Strictly anchored to corner with negative margin */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`
                    fixed -bottom-10 -right-10 z-10000
                    flex items-center justify-center w-20 h-20 rounded-full 
                    bg-black/80 backdrop-blur-xl border border-white/20
                    shadow-[0_0_30px_rgba(168,85,247,0.3)]
                    hover:bg-purple-900/40 hover:scale-105 active:scale-95
                    transition-all duration-300 group overflow-hidden
                    ${isChatOpen ? 'bg-purple-900/60 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.6)]' : ''}
                `}
            >
                <div className="pb-3 pr-3 relative"> {/* Push icon to Top-Left Quadrant */}
                    {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <div className="w-5 h-5" /> // Empty placeholder to maintain spacing if needed, or just nothing.
                    )}

                    {/* Pulse Dot in corner when idle */}
                    {!isChatOpen && !isProcessing && (
                        <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                    )}
                </div>
            </button>

            {/* Input - Floating Pill above the button */}
            <div className={`fixed bottom-24 right-6 z-10000 transition-all duration-300 ${isChatOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="w-[300px] bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl p-1 flex items-center gap-2">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                        placeholder={isProcessing ? "ONE is contemplating..." : "Ask ONE..."}
                        disabled={isProcessing}
                        className="flex-1 bg-transparent border-none p-3 px-4 resize-none focus:ring-0 text-white placeholder-white/40 text-sm h-[42px] leading-tight scrollbar-hide"
                        autoFocus={isChatOpen}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isProcessing}
                        className="p-2 rounded-full bg-purple-600/30 hover:bg-purple-600/50 text-white disabled:opacity-0 transition-all"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>

            {/* Speech Bubbles - Float higher up */}
            <div className={`fixed bottom-40 right-6 z-9999 flex flex-col items-end gap-2 max-w-[350px] pointer-events-none transition-all duration-300 ${isChatOpen ? 'translate-y-0' : 'translate-y-10'}`}>
                <AnimatePresence>
                    {bubbles.map((bubble, index) => (
                        <motion.div
                            key={bubble.id}
                            initial={{ opacity: 0, x: 20, y: 10 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="pointer-events-auto w-full"
                        >
                            <GlowCard
                                glowColor="purple"
                                customSize={true}
                                className="w-full p-0 aspect-auto! grid-rows-1! rounded-2xl! rounded-br-sm! shadow-xl overflow-hidden backdrop-blur-xl bg-black/80"
                            >
                                <div className="p-3 px-4">
                                    <p className="text-white text-sm leading-relaxed m-0">{bubble.text}</p>
                                </div>
                            </GlowCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </>
    );
};

export default VoiceAssistantOverlay;

