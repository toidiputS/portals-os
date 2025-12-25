import React from "react";
import { motion } from "framer-motion";

interface HolographicWidgetIconProps {
  size?: number;
  className?: string;
}

const HolographicWidgetIcon: React.FC<HolographicWidgetIconProps> = ({
  size = 24,
  className = "",
}) => {
  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white drop-shadow-lg"
      >
        <defs>
          <linearGradient
            id="widgetGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="50%" stopColor="#FF00FF" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <motion.rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          stroke="url(#widgetGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.rect
          x="6"
          y="6"
          width="12"
          height="12"
          rx="2"
          fill="url(#widgetGradient)"
          fillOpacity="0.2"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.circle
          cx="8"
          cy="8"
          r="1.5"
          fill="url(#widgetGradient)"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle
          cx="16"
          cy="8"
          r="1.5"
          fill="url(#widgetGradient)"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <motion.circle
          cx="8"
          cy="16"
          r="1.5"
          fill="url(#widgetGradient)"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
        <motion.circle
          cx="16"
          cy="16"
          r="1.5"
          fill="url(#widgetGradient)"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
        />
      </svg>
    </motion.div>
  );
};

export default HolographicWidgetIcon;
