import React from 'react';
import { 
  GeminiIcon, 
  TerminalIcon, 
  ContactIcon, 
  OracleIcon, 
  SettingsIcon,
  ProjectsIcon 
} from '../components/icons';

export interface Agent {
  id: string;
  name: string;
  href: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  glow: string;
  angle: number;
  radius: number;
}

export const AGENTS: Agent[] = [
  {
    id: 'gemini',
    name: 'Gemini Chat',
    href: '/geminiChat',
    Icon: GeminiIcon,
    glow: '#8B5CF6',
    angle: 0,
    radius: 150,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    href: '/terminal',
    Icon: TerminalIcon,
    glow: '#10B981',
    angle: 60,
    radius: 150,
  },
  {
    id: 'contact',
    name: 'Contact',
    href: '/contact',
    Icon: ContactIcon,
    glow: '#3B82F6',
    angle: 120,
    radius: 150,
  },
  {
    id: 'oracle',
    name: 'Oracle',
    href: '/oracle',
    Icon: OracleIcon,
    glow: '#F59E0B',
    angle: 180,
    radius: 150,
  },
  {
    id: 'settings',
    name: 'Settings',
    href: '/settings',
    Icon: SettingsIcon,
    glow: '#6366F1',
    angle: 240,
    radius: 150,
  },
  {
    id: 'projects',
    name: 'File Manager',
    href: '/fileManager',
    Icon: ProjectsIcon,
    glow: '#EC4899',
    angle: 300,
    radius: 150,
  },
];
