import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00D9FF] via-[#00FF9C] to-[#00FF9C] shadow-[0_0_12px_#00FF9C] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
