import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Zap, Lock } from 'lucide-react';
import { GlowCard } from '../components/GlowCard';

const PaidTierApp: React.FC = () => {
    return (
        <div className="flex-1 w-full h-full p-2 bg-black text-white overflow-hidden scrollbar-hide flex flex-col">
            {/* Header */}
            <motion.div
                className="w-full relative z-10 flex flex-col items-center justify-center p-8 bg-black border-b border-purple-500/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-purple-900/20 to-black pointer-events-none" />
                <Sparkles className="w-12 h-12 text-purple-400 mb-4" />
                <h1 className="text-3xl font-light mb-2 tracking-wider">The Inner Circle</h1>
                <p className="text-gray-400 text-center max-w-xl text-sm leading-relaxed">
                    Unlock your complete digital memory, project history, and full command over the 26-agent Oracle nexus.
                </p>
            </motion.div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Free Tier */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                        <GlowCard glowColor="blue" className="h-full bg-gray-900/40 border-gray-500/20 rounded-2xl flex flex-col p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-6 h-6 text-gray-400" />
                                <h2 className="text-xl font-medium text-gray-300">Base Access</h2>
                            </div>
                            <div className="text-3xl font-light text-white mb-6">Free</div>
                            <ul className="space-y-4 flex-1 mb-8 overflow-y-auto pr-2">
                                <li className="flex items-start gap-2 text-sm text-gray-400">
                                    <span className="text-purple-400 mt-0.5">•</span>
                                    Basic ONE companion features (Hover context)
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-400 opacity-60">
                                    <span className="text-purple-400 mt-0.5">•</span>
                                    Access to public system terminals
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-400 opacity-60">
                                    <span className="text-purple-400 mt-0.5">•</span>
                                    Ephemeral session memory (Erased on exit)
                                </li>
                            </ul>
                            <button disabled className="w-full py-3 rounded-lg bg-gray-800 text-gray-400 font-medium cursor-not-allowed">
                                Current Tier
                            </button>
                        </GlowCard>
                    </motion.div>

                    {/* Paid Tier */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                        <GlowCard glowColor="purple" className="h-full bg-purple-900/10 border-purple-500/30 rounded-2xl flex flex-col p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-bl-lg border-b border-l border-purple-500/20 font-mono">
                                RECOMMENDED
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="w-6 h-6 text-purple-400" />
                                <h2 className="text-xl font-medium text-white">Architect</h2>
                            </div>
                            <div className="text-3xl font-light text-white mb-2">
                                $49<span className="text-lg text-gray-400">/mo</span>
                            </div>
                            <p className="text-xs text-purple-400/60 mb-6 font-mono">Billed annually at $490</p>

                            <ul className="space-y-4 flex-1 mb-8 overflow-y-auto pr-2">
                                <li className="flex items-start gap-2 text-sm text-gray-200">
                                    <span className="text-purple-400 mt-0.5">•</span>
                                    <b>Books OS Setup:</b> Persistent memory and artifact storage.
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-200">
                                    <span className="text-purple-400 mt-0.5">•</span>
                                    <b>Full Oracle Capability:</b> Unlocked diagnosis tracking across sessions.
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-200">
                                    <span className="text-purple-400 mt-0.5">•</span>
                                    <b>Squad Node Deep Dives:</b> Unlimited access to all 26 specialized agents.
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-200">
                                    <span className="text-purple-400 mt-0.5">•</span>
                                    Zero artificial throttle delays on ONE hovering.
                                </li>
                            </ul>

                            <button className="w-full py-3 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2">
                                <Lock size={16} /> Upgrade to Architect
                            </button>
                        </GlowCard>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default PaidTierApp;
