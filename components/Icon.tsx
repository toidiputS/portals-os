import React from "react";
import { AppDefinition } from "../types";

interface IconProps {
  app: AppDefinition;
  onDoubleClick: () => void;
}

const Icon: React.FC<IconProps> = ({ app, onDoubleClick }) => {
  const IconComponent = app.icon;

  return (
    <button
      onDoubleClick={onDoubleClick}
      className="flex flex-col items-center p-2 rounded hover:bg-[hsl(var(--secondary-hsl))] w-24 h-24 text-center group relative"
      title={`${app.name}: ${app.description}`}
    >
      <IconComponent className="w-10 h-10 text-[hsl(var(--foreground-hsl))] mb-2" />
      <span className="text-[hsl(var(--foreground-hsl))] text-xs wrap-break-word leading-normal">
        {app.name}
      </span>

      {/* Custom tooltip on hover */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-[hsl(var(--popover-hsl))] text-[hsl(var(--popover-foreground-hsl))] text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-1000 whitespace-nowrap border border-[hsl(var(--border-hsl))]">
        <div className="font-semibold">{app.name}</div>
        <div className="text-xs text-[hsl(var(--muted-foreground-hsl))] mt-1">{app.description}</div>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-[hsl(var(--popover-hsl))]"></div>
      </div>
    </button>
  );
};

export default Icon;
