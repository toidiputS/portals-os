import React, { useState, useEffect, useRef } from 'react';
import { useKernel } from '../store/kernel';
import { ChatMessage, AppId } from '../types';
import { Send, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { generateOracleResponse, summarizeOracleHistory, generateOracleTitle } from '../services/oracleService';
import { APPS } from '../apps.config';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface OracleSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
}

interface OracleChatWidgetProps {
  embedded?: boolean;
}

const OracleChatWidget: React.FC<OracleChatWidgetProps> = ({ embedded = false }) => {
  const [isExpanded, setIsExpanded] = useState(embedded);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<OracleSession>({
    id: 'oracle-session',
    title: "Oracle's Guidance",
    messages: [],
    createdAt: new Date()
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const openWindow = useKernel(state => state.openWindow);
  const openFile = useKernel(state => state.openFile);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session.messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input;
    setInput('');
    setIsLoading(true);

    const userMessage: ChatMessage = { role: 'user', content: userInput };
    const updatedMessages = [...session.messages, userMessage];
    setSession(prev => ({ ...prev, messages: updatedMessages }));

    const historyForAPI = updatedMessages.length > 1
      ? [{ role: 'user' as const, content: await summarizeOracleHistory(updatedMessages.slice(0, -1)) }, userMessage]
      : [userMessage];

    const { text: responseText, groundingChunks, functionCalls } = await generateOracleResponse(
      userInput,
      'gemini-1.5-flash',
      historyForAPI,
      false
    );



    if (functionCalls && functionCalls.length > 0) {
      for (const fc of functionCalls) {
        if (fc.name === 'openWindow') {
          const { appId } = fc.args;
          if (appId && APPS.some(app => app.id === appId)) {
            openWindow(appId as AppId);
          } else {
            const errorMessage: ChatMessage = { role: 'model', content: `I cannot find an application called "${appId}".` };
            setSession(prev => ({
              ...prev,
              messages: [...prev.messages, errorMessage]
            }));
          }
        } else if (fc.name === 'openFile') {
          const { fileId } = fc.args;
          if (fileId) {
            openFile(fileId);
          }
        }
      }
    }

    if (responseText) {
      // Parse TELEPORT commands
      const teleportMatch = responseText.match(/\[TELEPORT\s*->\s*([A-Z])\]/i);
      if (teleportMatch) {
        const agentLetter = teleportMatch[1].toLowerCase();
        if (APPS.some(app => app.id === agentLetter)) {
          openWindow(agentLetter as AppId);
        }
      }

      const responseMessage: ChatMessage = { role: 'model', content: responseText, groundingChunks };
      setSession(prev => ({ ...prev, messages: [...prev.messages, responseMessage] }));

      // Update title if this is the first exchange
      if (updatedMessages.length === 1) {
        const newTitle = await generateOracleTitle([userMessage, responseMessage]);
        setSession(prev => ({ ...prev, title: newTitle }));
      }
    } else if (functionCalls && functionCalls.length > 0) {
      const calledFunctions = functionCalls.map(fc => fc.name).join(', ');
      const actionMessage: ChatMessage = { role: 'model', content: `I have activated: ${calledFunctions}.` };
      setSession(prev => ({ ...prev, messages: [...prev.messages, actionMessage] }));
    }

    setIsLoading(false);
  };

  const clearChat = () => {
    setSession({
      id: 'oracle-session',
      title: "Oracle's Guidance",
      messages: [],
      createdAt: new Date()
    });
  };

  if (embedded) {
    return (
      <div className="w-full h-full bg-black flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-linear-to-r from-purple-900/20 to-blue-900/20">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-purple-400" />
            <span className="text-white font-semibold">Oracle</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Clear conversation"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {session.messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-purple-900/50 text-purple-100 border border-purple-500/20 rounded-bl-sm'
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      strong: ({ children }) => <strong className="text-purple-200">{children}</strong>,
                      em: ({ children }) => <em className="text-purple-300 italic">{children}</em>,
                      code: ({ children }) => <code className="bg-black/30 px-2 py-1 rounded text-xs">{children}</code>
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-purple-900/50 border border-purple-500/20 p-4 rounded-lg rounded-bl-sm">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                    className="w-3 h-3 rounded-full bg-purple-400"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    className="w-3 h-3 rounded-full bg-purple-400"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    className="w-3 h-3 rounded-full bg-purple-400"
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-purple-500/20">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask Oracle anything..."
              className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg p-4 pr-14 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 text-sm min-h-[50px] max-h-32"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isExpanded ? (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsExpanded(true)}
          className="w-14 h-14 bg-linear-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-white/20"
          title="Consult Oracle"
        >
          <Sparkles size={24} />
        </motion.button>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="w-96 h-[500px] bg-black/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-purple-500/20 bg-linear-to-r from-purple-900/20 to-blue-900/20">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-white font-semibold text-sm">Oracle</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Clear conversation"
              >
                🗑️
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Minimize"
              >
                <Minimize2 size={14} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <AnimatePresence initial={false}>
              {session.messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-purple-900/50 text-purple-100 border border-purple-500/20 rounded-bl-sm'
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="text-purple-200">{children}</strong>,
                        em: ({ children }) => <em className="text-purple-300 italic">{children}</em>,
                        code: ({ children }) => <code className="bg-black/30 px-1 py-0.5 rounded text-xs">{children}</code>
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-purple-900/50 border border-purple-500/20 p-3 rounded-lg rounded-bl-sm">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                      className="w-2 h-2 rounded-full bg-purple-400"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-purple-400"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-purple-400"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-purple-500/20">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask Oracle anything..."
                className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg p-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 text-sm min-h-11 max-h-24"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OracleChatWidget;
