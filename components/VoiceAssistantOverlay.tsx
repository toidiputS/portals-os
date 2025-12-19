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
                id: `bubble-${Date.now()}`,
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
        if (!input.trim()) return;

        const userInput = input;
        setInput('');

        // Show user message as a bubble immediately
        showSpeechBubble(userInput);

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

        try {
            // Call API
            const { text: responseText, groundingChunks, functionCalls } = await generateOracleResponse(
                userInput,
                'gemini-1.5-flash',
                historyForAPI,
                false
            );

            // Handle Function Calls
            if (functionCalls && functionCalls.length > 0) {
                for (const fc of functionCalls) {
                    if (fc.name === 'openWindow') {
                        const { appId } = fc.args;
                        if (appId && APPS.some(app => app.id === appId)) {
                            openWindow(appId);
                        }
                    } else if (fc.name === 'openFile') {
                        const { fileId } = fc.args;
                        if (fileId) {
                            openFile(fileId);
                        }
                    }
                }
            }

            // Handle Text Response
            if (responseText) {
                // Parse TELEPORT commands
                const teleportMatch = responseText.match(/\[TELEPORT\s*->\s*([A-Z])\]/i);
                if (teleportMatch) {
                    const agentLetter = teleportMatch[1].toLowerCase();
                    if (APPS.some(app => app.id === agentLetter)) {
                        openWindow(agentLetter as AppId);
                    }
                }

                const modelMessage: ChatMessage = { role: 'model', content: responseText, groundingChunks };
                addMessageToSession(sessionId, modelMessage);
                showSpeechBubble(responseText);
            }

            // Generate Title if new chat
            if (currentSession.messages.length <= 2) {
                const newTitle = await generateOracleTitle([userMessage, { role: 'model', content: responseText || '' }]);
                updateSessionTitle(sessionId, newTitle);
            }

        } catch (error) {
            console.error("Error in overlay chat:", error);
            showSpeechBubble("Sorry, I encountered an error. Please try again.");
        }
    };

    if (embedded) {
        return (
            <div className="w-full h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-linear-to-r from-purple-900/20 to-blue-900/20">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">Oracle</span>
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
                            placeholder="Ask Oracle anything..."
                            className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg p-4 pr-14 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 text-sm min-h-[50px] max-h-32"
                            rows={2}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            aria-label="Send message"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 z-9999 pointer-events-none flex flex-col items-end gap-4">
            {/* Speech Bubbles */}
            <div className="flex flex-col items-end gap-3 max-w-[350px]">
                <AnimatePresence>
                    {bubbles.map((bubble, index) => (
                        <motion.div
                            key={bubble.id}
                            initial={{ opacity: 0, x: 50, y: 20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, x: 50, scale: 0.8 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="pointer-events-auto w-full"
                        >
                            <GlowCard
                                glowColor="purple"
                                customSize={true}
                                className="w-full p-3 aspect-auto! grid-rows-1!"
                            >
                                <p className="text-white text-sm leading-relaxed m-0">{bubble.text}</p>
                            </GlowCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Chat Input */}
            <motion.div
                className="pointer-events-auto w-[300px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <GlowCard glowColor="blue" customSize={true} className="w-full p-1">
                    <div className="flex items-center gap-2 bg-[hsl(var(--background-hsl))] rounded-md p-1">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Consult the Oracle..."
                            className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2 py-1 text-[hsl(var(--foreground-hsl))]"
                        />
                        <button
                            type="button"
                            onClick={handleSend}
                            aria-label="Send"
                            className="p-1.5 rounded-md bg-[hsl(var(--primary-hsl))] text-[hsl(var(--primary-foreground-hsl))] hover:brightness-110 transition-all"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </GlowCard>
            </motion.div>
        </div>
    );
};

export default VoiceAssistantOverlay;
