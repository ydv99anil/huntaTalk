import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Transition({
  children,
  intro,
  onFinished,
  autoExit = true,
}) {
  const [showIntro, setShowIntro] = React.useState(true);

  const triggerExit = () => {
    setShowIntro(false);
    if (onFinished) onFinished();
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center p-10"
          >
            {intro ? intro(triggerExit) : null}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}