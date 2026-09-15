"use client";

import {
  motion,
  useScroll,
  useSpring,
} from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[9999] h-[2px] w-full origin-left bg-green-600"
    />
  );
};

export default ScrollProgress;