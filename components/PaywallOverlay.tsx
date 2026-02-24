import React from 'react';
import { useKernel } from '../store/kernel';
import { Lock, Sparkles } from 'lucide-react';

interface PaywallOverlayProps {
    nodeId?: string;
    squadId?: string;
    message?: string;
}

export const PaywallOverlay: React.FC<PaywallOverlayProps> = ({
    nodeId,
    squadId,
    message = "This secured node requires clearance."
}) => {
    const openWindow = useKernel(state => state.openWindow);

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs rounded-lg">
            <button
                onClick={() => openWindow('subscription')}
                className="py-2 px-6 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white font-bold tracking-widest text-[10px] uppercase transition-colors shadow-2xl flex items-center justify-center gap-2 backdrop-blur-md group"
            >
                <Lock className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                UNLOCK ACCESS
            </button>
        </div>
    );
};
