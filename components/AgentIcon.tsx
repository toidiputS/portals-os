import React from "react";
import { useKernel } from "../store/kernel";

interface Props {
  name: string;
  href: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  style: React.CSSProperties;
  glow: string;
  onAgentClick?: () => void;
  clickable?: boolean;
}

export const AgentIcon = ({ name, href, Icon, style, glow, onAgentClick, clickable = false }: Props) => {
  const { openWindow } = useKernel();

  const handleClick = (e: React.MouseEvent) => {
    // First trigger the onAgentClick callback (for welcome screen transition)
    if (onAgentClick) {
      onAgentClick();
      return;
    }

    if (href.startsWith("/")) {
      // Internal app - prevent default and open as window
      e.preventDefault();
      const appId = href.substring(1) as any; // Remove the leading slash
      openWindow(appId);
    }
    // External links will use default anchor behavior
  };

  // If not clickable, render as non-clickable div
  if (!clickable && !onAgentClick) {
    return (
      <div
        style={style}
        className="absolute group"
        aria-label={name}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            boxShadow: `0 0 18px ${glow}`,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Icon className="w-8 h-8" />
        </div>
      </div>
    );
  }

  const Wrapper: any = href.startsWith("/") ? "button" : "a";
  const wrapperProps = href.startsWith("/")
    ? { onClick: handleClick, type: "button" }
    : { href, target: "_blank", rel: "noreferrer" };

  return (
    <Wrapper
      {...wrapperProps}
      style={style}
      className="absolute group"
      aria-label={name}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{
          boxShadow: `0 0 18px ${glow}`,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Icon className="w-8 h-8" />
      </div>
    </Wrapper>
  );
};
