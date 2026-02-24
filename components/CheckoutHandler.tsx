import React, { useEffect, useState } from 'react';
import { useKernel } from '../store/kernel';
import { Sparkles, PackageCheck } from 'lucide-react';
import { PLATOON_SQUADS, PLATOON_DOMAINS } from '../constants/platoon';

export const CheckoutHandler: React.FC = () => {
    const [purchasedItems, setPurchasedItems] = useState<{ type: string, id: string, name?: string }[]>([]);

    const unlockNode = useKernel(state => state.unlockNode);
    const unlockSquad = useKernel(state => state.unlockSquad);
    const openPwaSidebar = useKernel(state => state.openPwaSidebar);
    const openSquadSidebar = useKernel(state => state.openSquadSidebar);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const purchasedParam = searchParams.get('purchased');

        if (purchasedParam) {
            // Expected format: ?purchased=node:SE,squad:squad-1,node:NX
            const items = purchasedParam.split(',');
            const processedItems: { type: string, id: string, name?: string }[] = [];

            items.forEach(item => {
                const [type, id] = item.split(':');
                if (type && id) {
                    if (type === 'node') {
                        unlockNode(id);
                        // Find node name for UI
                        let nodeName = "Unknown Node";
                        let nodeObj = null;
                        for (const domain of PLATOON_DOMAINS) {
                            const found = domain.nodes.find(n => n.id === id);
                            if (found) {
                                nodeName = found.name;
                                nodeObj = found;
                                break;
                            }
                        }
                        processedItems.push({ type, id, name: nodeName });

                    } else if (type === 'squad') {
                        unlockSquad(id);
                        const squad = PLATOON_SQUADS.find(s => s.id === id);
                        processedItems.push({ type, id, name: squad?.name || "Unknown Squad" });
                    }
                }
            });

            // Clean the URL
            window.history.replaceState({}, document.title, window.location.pathname);

            if (processedItems.length === 1) {
                // If only 1 item, open it directly
                const item = processedItems[0];
                if (item.type === 'node') {
                    for (const domain of PLATOON_DOMAINS) {
                        const node = domain.nodes.find(n => n.id === item.id);
                        if (node) {
                            openPwaSidebar({
                                ...node,
                                label: node.name,
                                parentLabel: domain.name,
                                parentSquadId: domain.id
                            } as any);
                            break;
                        }
                    }
                } else if (item.type === 'squad') {
                    openSquadSidebar(item.id);
                }
            } else if (processedItems.length > 1) {
                // If multiple, show the welcome modal
                setPurchasedItems(processedItems);
            }
        }
    }, [unlockNode, unlockSquad, openPwaSidebar, openSquadSidebar]);

    if (purchasedItems.length === 0) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
            <div className="bg-[#0B0F19] border border-yellow-400/30 rounded-2xl p-8 max-w-lg w-full flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(250,204,21,0.15)]">
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-linear-to-b from-yellow-500/10 to-transparent pointer-events-none" />

                <div className="flex flex-col items-center text-center mb-8 relative z-10">
                    <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mb-4 border border-yellow-400/20 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                        <Sparkles className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-2">Welcome to the Inner Circle</h2>
                    <p className="text-gray-400 text-sm">Your new assets have been fully unlocked and added to your nexus.</p>
                </div>

                <div className="space-y-3 relative z-10 flex-1 overflow-y-auto max-h-[40vh] pr-2">
                    {purchasedItems.map((item, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between group hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-2 border border-emerald-500/30 bg-emerald-500/10 rounded-lg">
                                    <PackageCheck className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.type}</span>
                                    <span className="text-white font-medium">{item.name}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (item.type === 'node') {
                                        for (const domain of PLATOON_DOMAINS) {
                                            const node = domain.nodes.find(n => n.id === item.id);
                                            if (node) {
                                                openPwaSidebar({
                                                    ...node,
                                                    label: node.name,
                                                    parentLabel: domain.name,
                                                    parentSquadId: domain.id
                                                } as any);
                                                break;
                                            }
                                        }
                                    } else {
                                        openSquadSidebar(item.id);
                                    }
                                    setPurchasedItems([]); // Close modal
                                }}
                                className="px-4 py-2 bg-white/5 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors"
                            >
                                Launch
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 relative z-10 pt-6 border-t border-white/10 flex justify-center">
                    <button
                        onClick={() => setPurchasedItems([])}
                        className="text-gray-500 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors"
                    >
                        Close to Desktop
                    </button>
                </div>
            </div>
        </div>
    );
};
