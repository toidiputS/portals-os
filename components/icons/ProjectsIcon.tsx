import React from 'react';
import './holographic-icons.css';

interface ProjectsIconProps {
    className?: string;
    size?: number;
}

export const ProjectsIcon: React.FC<ProjectsIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon projects-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Wireframe octahedron - 3D perspective */}
            {/* Top pyramid */}
            <polyline
                className="octahedron-edge"
                points="32,12 18,32 32,52"
                strokeWidth="1.5"
            />
            <polyline
                className="octahedron-edge"
                points="32,12 46,32 32,52"
                strokeWidth="1.5"
            />
            <line
                className="octahedron-edge"
                x1="18"
                y1="32"
                x2="46"
                y2="32"
                strokeWidth="1.5"
            />

            {/* Back edges (fainter) */}
            <line
                className="octahedron-edge octahedron-back"
                x1="32"
                y1="12"
                x2="32"
                y2="52"
                strokeWidth="1.5"
            />

            {/* Vertex nodes */}
            <circle className="vertex-node" cx="32" cy="12" r="1.5" />
            <circle className="vertex-node" cx="18" cy="32" r="1.5" />
            <circle className="vertex-node" cx="46" cy="32" r="1.5" />
            <circle className="vertex-node" cx="32" cy="52" r="1.5" />
        </svg>
    );
};
