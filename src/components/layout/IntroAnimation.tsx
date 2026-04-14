import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation({ 
  children, 
  enabled = true 
}: { 
  children: React.ReactNode;
  enabled?: boolean;
}) {
  const [showIntro, setShowIntro] = useState(enabled);

  useEffect(() => {
    if (!showIntro) return;

    // The intro handles its own unmount after 1.8 seconds to allow the animations to finish
    // Total animation duration should feel premium around 1.8s to 2.2s
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [showIntro]);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-overlay"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAFAFA]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ 
                opacity: 0, 
                scale: 0.7, 
                filter: "blur(10px)",
                rotate: -3 
              }}
              animate={{ 
                opacity: 1, 
                scale: [0.7, 1.08, 1], 
                filter: ["blur(10px)", "blur(0px)", "blur(0px)"],
                rotate: [-3, 0, 0] 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.75, 
                filter: "blur(6px)" 
              }}
              transition={{ 
                duration: 1.4, 
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.6, 1]
              }}
              className="text-6xl md:text-7xl lg:text-[6rem] font-semibold tracking-[0.3em] text-emerald-950 select-none flex items-center justify-center"
            >
              OFFSET
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={enabled ? { opacity: 0, y: 20 } : false}
        animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
