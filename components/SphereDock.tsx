import { AGENTS } from "../data/agents";
import { AgentIcon } from "./AgentIcon";

interface SphereDockProps {
  onAgentClick?: () => void;
  clickable?: boolean;
  excludeAgents?: string[];
}

export const SphereDock = ({ onAgentClick, clickable = false, excludeAgents = [] }: SphereDockProps) => {
  const filteredAgents = AGENTS.filter(agent => !excludeAgents.includes(agent.id));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-[400px] h-[400px] pointer-events-auto">
        {filteredAgents.map((agent, i) => {
          const rad = (agent.angle * Math.PI) / 180;
          const x = Math.cos(rad) * agent.radius;
          const y = Math.sin(rad) * agent.radius;

          return (
            <AgentIcon
              key={agent.id}
              name={agent.name}
              href={agent.href}
              Icon={agent.Icon}
              glow={agent.glow}
              onAgentClick={clickable ? undefined : onAgentClick}
              clickable={clickable}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                animation: `float${i % 3} 6s ease-in-out infinite`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
