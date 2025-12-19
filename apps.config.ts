import React, { lazy } from 'react';
import { AppId, BuiltInAppId, AppDefinition, ProjectFolder } from './types';
import { FileText, Store, Folder, FolderOpen } from 'lucide-react';
import { TerminalIcon, SettingsIcon, ProjectsIcon, GeminiIcon, ContactIcon, OracleIcon, AngleIcon, AIcon, BIcon, CIcon, DraftIcon, DIcon, EnvoyIcon, FIcon, GIcon, HIcon, IIcon, JIcon, KIcon, LIcon, MIcon, NIcon, OIcon, PIcon, QIcon, RIcon, SIcon, TIcon, UIcon, VIcon, WIcon, XRayIcon, XIcon, YIcon, ZIcon, FileManagerIcon, AppStoreIcon, FileViewerIcon } from './components/icons';

export const APPS_CONFIG: Record<BuiltInAppId, AppDefinition> = {
  geminiChat: {
    id: 'geminiChat',
    name: 'Gemini Chat',
    icon: GeminiIcon,
    component: lazy(() => import('./apps/GeminiChat')),
    description: "Chat with Google's powerful Gemini AI models.",
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    icon: TerminalIcon,
    component: lazy(() => import('./apps/Terminal')),
    description: "Access to command-line interface.",
  },
  contact: {
    id: 'contact',
    name: 'Contact Me',
    icon: ContactIcon,
    component: lazy(() => import('./apps/Contact')),
    description: "Send me a message.",
  },
  markdownEditor: {
    id: 'markdownEditor',
    name: 'Markdown Editor',
    icon: FileText,
    component: lazy(() => import('./apps/MarkdownEditor')),
    description: 'A simple, persistent markdown notes application.',
  },
  settings: {
    id: 'settings',
    name: 'Settings',
    icon: SettingsIcon,
    component: lazy(() => import('./apps/Settings')),
    description: 'Personalize your desktop environment.',
  },
  appStore: {
    id: 'appStore',
    name: 'App Store',
    icon: AppStoreIcon,
    component: lazy(() => import('./apps/AppStore')),
    description: 'Discover and launch applications.',
  },
  fileManager: {
    id: 'fileManager',
    name: 'File Manager',
    icon: FileManagerIcon,
    component: lazy(() => import('./apps/FileManager')),
    description: 'Browse files and manage project folders.',
  },
  fileViewer: {
    id: 'fileViewer',
    name: 'File Viewer',
    icon: FileViewerIcon,
    component: lazy(() => import('./apps/FileViewer')),
    description: 'View file contents.',
  },
  oracle: {
    id: 'oracle',
    name: 'Oracle',
    icon: OracleIcon,
    component: lazy(() => import('./apps/Oracle')),
    description: 'AI-powered voice assistant for guidance and app control.',
  },

  a: {
    id: 'a',
    name: 'Angle',
    icon: AngleIcon,
    component: lazy(() => import('./apps/A')),
    description: 'Foundation - Core structural analysis and angle calculations',
  },
  b: {
    id: 'b',
    name: 'Blueprint',
    icon: BIcon,
    component: lazy(() => import('./apps/B')),
    description: 'Strategy - Comprehensive planning and blueprint design',
  },
  c: {
    id: 'c',
    name: 'Calculator',
    icon: CIcon,
    component: lazy(() => import('./apps/C')),
    description: 'Economics - Financial calculations and economic modeling',
  },
  d: {
    id: 'd',
    name: 'Draft',
    icon: DraftIcon,
    component: lazy(() => import('./apps/D')),
    description: 'Copywriting - Professional content creation and drafting',
  },
  e: {
    id: 'e',
    name: 'Envoy',
    icon: EnvoyIcon,
    component: lazy(() => import('./apps/E')),
    description: 'Outreach - Communication and relationship management',
  },
  f: {
    id: 'f',
    name: 'Flo',
    icon: FIcon,
    component: lazy(() => import('./apps/F')),
    description: 'Content - Dynamic content flow and management',
  },
  g: {
    id: 'g',
    name: 'Grind',
    icon: GIcon,
    component: lazy(() => import('./apps/G')),
    description: 'Operations - Process optimization and operational efficiency',
  },
  h: {
    id: 'h',
    name: 'Helper',
    icon: HIcon,
    component: lazy(() => import('./apps/H')),
    description: 'Assets - Resource management and digital asset handling',
  },
  i: {
    id: 'i',
    name: 'Interpreter',
    icon: IIcon,
    component: lazy(() => import('./apps/I')),
    description: 'Structure - Data interpretation and structural analysis',
  },
  j: {
    id: 'j',
    name: 'Jam',
    icon: JIcon,
    component: lazy(() => import('./apps/J')),
    description: 'Conversation - Interactive dialogue and communication tools',
  },
  k: {
    id: 'k',
    name: 'Kin',
    icon: KIcon,
    component: lazy(() => import('./apps/K')),
    description: 'In-Touch - Personal connection and relationship tools',
  },
  l: {
    id: 'l',
    name: 'Listen',
    icon: LIcon,
    component: lazy(() => import('./apps/L')),
    description: 'Insight - Audio processing and listening intelligence',
  },
  m: {
    id: 'm',
    name: 'Map',
    icon: MIcon,
    component: lazy(() => import('./apps/M')),
    description: 'Workflow - Process mapping and workflow optimization',
  },
  n: {
    id: 'n',
    name: 'Nerve',
    icon: NIcon,
    component: lazy(() => import('./apps/N')),
    description: 'Nerve - Neural network analysis and system intelligence',
  },
  o: {
    id: 'o',
    name: 'Optimize',
    icon: OIcon,
    component: lazy(() => import('./apps/O')),
    description: 'Bottleneck - Performance analysis and optimization',
  },
  p: {
    id: 'p',
    name: 'Polish',
    icon: PIcon,
    component: lazy(() => import('./apps/P')),
    description: 'Refinement - Content polishing and quality enhancement',
  },
  q: {
    id: 'q',
    name: 'Quick',
    icon: QIcon,
    component: lazy(() => import('./apps/Q')),
    description: 'Momentum - Rapid task execution and productivity boost',
  },
  r: {
    id: 'r',
    name: 'Research',
    icon: RIcon,
    component: lazy(() => import('./apps/R')),
    description: 'Market - Market research and competitive analysis',
  },
  s: {
    id: 's',
    name: 'Scroll',
    icon: SIcon,
    component: lazy(() => import('./apps/S')),
    description: 'Knowledge - Information scrolling and knowledge management',
  },
  t: {
    id: 't',
    name: 'Timeline',
    icon: TIcon,
    component: lazy(() => import('./apps/T')),
    description: 'History - Timeline management and historical analysis',
  },
  u: {
    id: 'u',
    name: 'Unfold',
    icon: UIcon,
    component: lazy(() => import('./apps/U')),
    description: 'Tasks - Task unfolding and project management',
  },
  v: {
    id: 'v',
    name: 'Velocity',
    icon: VIcon,
    component: lazy(() => import('./apps/V')),
    description: 'Performance - Speed optimization and performance metrics',
  },
  w: {
    id: 'w',
    name: 'Warp',
    icon: WIcon,
    component: lazy(() => import('./apps/W')),
    description: 'Power-User - Advanced user tools and power features',
  },
  x: {
    id: 'x',
    name: 'X-Ray',
    icon: XRayIcon,
    component: lazy(() => import('./apps/X')),
    description: 'Advanced - Deep system analysis and diagnostics',
  },
  y: {
    id: 'y',
    name: 'Yield',
    icon: YIcon,
    component: lazy(() => import('./apps/Y')),
    description: 'Profitability - Financial yield analysis and optimization',
  },
  z: {
    id: 'z',
    name: 'Zone',
    icon: ZIcon,
    component: lazy(() => import('./apps/Z')),
    description: 'Experimental - Cutting-edge experimental features',
  }
};

export const APPS = Object.values(APPS_CONFIG);

// Agent apps (A-Z) that should only be accessible through App Store
const AGENT_APP_IDS: BuiltInAppId[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Core system apps that appear in start menu
const CORE_APP_IDS: BuiltInAppId[] = ['geminiChat', 'terminal', 'contact', 'markdownEditor', 'settings', 'appStore', 'fileManager', 'fileViewer', 'oracle'];

/**
 * Get core system apps for the start menu (excludes agent apps)
 */
export const getCoreApps = (projectFolders: ProjectFolder[]): AppDefinition[] => {
  const coreApps = CORE_APP_IDS.map(id => APPS_CONFIG[id]);

  const folderApps: AppDefinition[] = projectFolders.map(folder => ({
    id: folder.id as AppId,
    name: folder.name,
    icon: FolderOpen,
    component: lazy(() => import('./apps/FolderView')),
    description: `Project: ${folder.path}`,
    isCustom: true,
  }));

  return [...coreApps, ...folderApps];
};

/**
 * Get all apps including agent apps (for App Store)
 */
export const getAllApps = (projectFolders: ProjectFolder[]): AppDefinition[] => {
  const builtInApps = Object.values(APPS_CONFIG);

  const folderApps: AppDefinition[] = projectFolders.map(folder => ({
    id: folder.id as AppId,
    name: folder.name,
    icon: FolderOpen,
    component: lazy(() => import('./apps/FolderView')),
    description: `Project: ${folder.path}`,
    isCustom: true,
  }));

  return [...builtInApps, ...folderApps];
};
