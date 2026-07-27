import { motion } from "framer-motion";

const FloatingShape = ({ color = "#00e0ff", size = 300, top = "0%", left = "0%", delay = 0 }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        opacity: 0.3,
        filter: "blur(80px)",
        zIndex: 0,
        pointerEvents: "none",
      }}
      animate={{
        y: ["0%", "15%", "0%"],
        x: ["0%", "10%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 30,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShape;
