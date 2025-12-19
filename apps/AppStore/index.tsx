import React from 'react';
import { useKernel } from '../../store/kernel';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowCard } from '../../components/GlowCard';
import Icon from '../../components/Icon';
import { AIcon, BIcon, CIcon, DIcon, EIcon, FIcon, GIcon, HIcon, IIcon, JIcon, KIcon, LIcon, MIcon, NIcon, OIcon, PIcon, QIcon, RIcon, SIcon, TIcon, UIcon, VIcon, WIcon, XRayIcon, YIcon, ZIcon } from '../../components/icons';
import { AppDefinition } from '../../types';

// --- New Custom Icons for App Variety ---

const CalculatorIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
        <line x1="8" y1="6" x2="16" y2="6"></line>
        <line x1="8" y1="10" x2="8" y2="10"></line>
        <line x1="12" y1="10" x2="12" y2="10"></line>
        <line x1="16" y1="10" x2="16" y2="10"></line>
        <line x1="8" y1="14" x2="8" y2="14"></line>
        <line x1="12" y1="14" x2="12" y2="14"></line>
        <line x1="16" y1="14" x2="16" y2="14"></line>
        <line x1="8" y1="18" x2="12" y2="18"></line>
        <line x1="16" y1="18" x2="16" y2="18"></line>
    </svg>
);

const WeatherIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
      <path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"></path>
    </svg>
);

const MusicIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 12L17 10"></path>
        <path d="M9 9l-2.5-1.5"></path>
    </svg>
);

const CodeEditorIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M7 8l-4 4 4 4"></path>
        <path d="M17 8l4 4-4 4"></path>
        <path d="M14 4l-4 16"></path>
    </svg>
);

const ModelViewerIcon = ({ className }: { className?: string }) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
     </svg>
);

const ZenGardenIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9Z"></path>
        <path d="M20.2 16.5A4.5 4.5 0 0 0 15.7 12a4.5 4.5 0 0 0-4.5 4.5"></path>
        <path d="M3.8 7.5A4.5 4.5 0 0 1 8.3 12a4.5 4.5 0 0 1-4.5 4.5"></path>
    </svg>
);


const AGENT_APPS = [
  { id: 'a', name: 'Angle', title: 'Foundation', icon: AIcon },
  { id: 'b', name: 'Blueprint', title: 'Strategy', icon: BIcon },
  { id: 'c', name: 'Calculator', title: 'Economics', icon: CIcon },
  { id: 'd', name: 'Draft', title: 'Copywriting', icon: DIcon },
  { id: 'e', name: 'Envoy', title: 'Outreach', icon: EIcon },
  { id: 'f', name: 'Flo', title: 'Content', icon: FIcon },
  { id: 'g', name: 'Grind', title: 'Operations', icon: GIcon },
  { id: 'h', name: 'Helper', title: 'Assets', icon: HIcon },
  { id: 'i', name: 'Interpreter', title: 'Structure', icon: IIcon },
  { id: 'j', name: 'Jam', title: 'Conversation', icon: JIcon },
  { id: 'k', name: 'Kin', title: 'In-Touch', icon: KIcon },
  { id: 'l', name: 'Listen', title: 'Insight', icon: LIcon },
  { id: 'm', name: 'Map', title: 'Workflow', icon: MIcon },
  { id: 'n', name: 'Nerve', title: 'Nerve', icon: NIcon },
  { id: 'o', name: 'Optimize', title: 'Bottleneck', icon: OIcon },
  { id: 'p', name: 'Polish', title: 'Refinement', icon: PIcon },
  { id: 'q', name: 'Quick', title: 'Momentum', icon: QIcon },
  { id: 'r', name: 'Research', title: 'Market', icon: RIcon },
  { id: 's', name: 'Scroll', title: 'Knowledge', icon: SIcon },
  { id: 't', name: 'Timeline', title: 'History', icon: TIcon },
  { id: 'u', name: 'Unfold', title: 'Tasks', icon: UIcon },
  { id: 'v', name: 'Velocity', title: 'Performance', icon: VIcon },
  { id: 'w', name: 'Warp', title: 'Power-User', icon: WIcon },
  { id: 'x', name: 'X-Ray', title: 'Advanced', icon: XRayIcon },
  { id: 'y', name: 'Yield', title: 'Profitability', icon: YIcon },
  { id: 'z', name: 'Zone', title: 'Experimental', icon: ZIcon },
];

const AppStore: React.FC = () => {
  const openWindow = useKernel((state) => state.openWindow);

  return (
    <div className="app-store-content h-full overflow-y-auto relative z-10">
      <style dangerouslySetInnerHTML={{
        __html: `
          .app-store-content {
            background: black !important;
            backdrop-filter: none !important;
          }
          .glow-card.glow-purple {
            background: transparent !important;
            backdrop-filter: none !important;
            border: none !important;
          }
          .glow-card::before,
          .glow-card::after {
            display: none !important;
          }
        `
      }} />
      <div className="p-6">
        <header className="flex items-center gap-4 mb-6">
          <ShoppingCart size={32} className="text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">App Store</h1>
            <p className="text-gray-400 text-sm">Discover and launch agent applications.</p>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-4">
          {AGENT_APPS.map((app) => {
            const appDef: AppDefinition = {
              id: app.id as any,
              name: app.name,
              icon: app.icon,
              component: null as any,
              description: `${app.name}: ${app.title}`,
            };

            return (
              <Icon
                key={app.id}
                app={appDef}
                onDoubleClick={() => window.open(`https://${app.id}.itsai.services`, '_blank')}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppStore;
