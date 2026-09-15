"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
}

const Float = ({
  children,
  className = "",
  distance = 12,
  duration = 6,
  delay = 0,
}: FloatProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Float;