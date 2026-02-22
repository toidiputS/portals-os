import React, { lazy } from "react";
import { AppId, BuiltInAppId, AppDefinition, ProjectFolder } from "./types";
import { FileText, Folder, FolderOpen, Sparkles } from "lucide-react";
import {
  TerminalIcon,
  ContactIcon,
  OracleIcon,
  PotatoCometIcon,
} from "./components/icons";


// CLEAN SLATE: Only the 6 core apps you requested
export const APPS_CONFIG: Record<BuiltInAppId, AppDefinition> = {
  oracle: {
    id: "oracle",
    name: "Oracle",
    icon: OracleIcon,
    component: lazy(() => import("./apps/Oracle")),
    description: "AI-powered voice assistant for guidance and app control.",
  },
  subscription: {
    id: "subscription" as BuiltInAppId,
    name: "Upgrades",
    icon: Sparkles,
    component: lazy(() => import("./apps/SubscriptionApp")),
    description: "Unlock Architect tier for Memory & Books OS.",
  },
  notionLike: {
    id: "notionLike",
    name: "Not Notes",
    icon: FileText,
    component: lazy(() => import("./apps/Not")),
    description: "Rich note-taking app with pages, tags, and search functionality.",
  },
  terminal: {
    id: "terminal",
    name: "Terminal",
    icon: TerminalIcon,
    component: lazy(() => import("./apps/Terminal")),
    description: "Access to command-line interface.",
  },
  markdownEditor: {
    id: "markdownEditor",
    name: "Markdown Editor",
    icon: FileText,
    component: lazy(() => import("./apps/MarkdownEditor")),
    description: "A simple, persistent markdown notes application.",
  },
  contact: {
    id: "contact",
    name: "Contact Me",
    icon: ContactIcon,
    component: lazy(() => import("./apps/Contact")),
    description: "Send me a message.",
  },
  fileManager: {
    id: "fileManager",
    name: "File Manager",
    icon: Folder,
    component: lazy(() => import("./apps/FileManager")),
    description: "Browse files and manage project folders.",
  },
  fileViewer: {
    id: "fileViewer",
    name: "File Viewer",
    icon: FileText,
    component: lazy(() => import("./apps/FileViewer")),
    description: "View file contents.",
  },
  settings: {
    id: "settings",
    name: "Settings",
    icon: Folder,
    component: lazy(() => import("./apps/Settings")),
    description: "System settings.",
  },
};

export const APPS = Object.values(APPS_CONFIG);

// Core system apps that appear in start menu and circular menu
const CORE_APP_IDS: BuiltInAppId[] = [
  "oracle",
  "subscription",
  "notionLike",
  "terminal",
  "markdownEditor",
  "contact",
  "fileManager",
  "settings",
];

/**
 * Get core system apps for the start menu
 */
export const getCoreApps = (
  projectFolders: ProjectFolder[]
): AppDefinition[] => {
  const coreApps = CORE_APP_IDS.map((id) => APPS_CONFIG[id]);

  const folderApps: AppDefinition[] = projectFolders.map((folder) => ({
    id: folder.id as AppId,
    name: folder.name,
    icon: FolderOpen,
    component: lazy(() => import("./apps/FolderView")),
    description: `Project: ${folder.path}`,
    isCustom: true,
  }));

  return [...coreApps, ...folderApps];
};

/**
 * Get all apps (same as core for now - clean slate)
 */
export const getAllApps = (
  projectFolders: ProjectFolder[]
): AppDefinition[] => {
  return getCoreApps(projectFolders);
};



/**
 * Get apps for the floating sphere - just the potato comet
 */
export const getSphereApps = (
  _projectFolders: ProjectFolder[]
): any[] => {
  return [{
    id: 'potatoComet' as AppId,
    name: 'Potato Comet',
    icon: PotatoCometIcon,
    description: 'A flaming potato hauling ass through the cosmos',
  }];
};
