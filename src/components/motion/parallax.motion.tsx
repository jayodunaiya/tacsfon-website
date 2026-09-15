"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ReactNode,
  useRef,
} from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  distance?: number;
}

const Parallax = ({
  children,
  className = "",
  distance = 60,
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [distance, -distance]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Parallax;