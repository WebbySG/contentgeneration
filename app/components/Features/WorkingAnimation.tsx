import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface WorkingAnimationProps {
  answer: string;
}

const workingMessages = [
  "Processing your input...",
  "Analyzing your business needs...",
  "Building your profile...",
  "Optimizing recommendations...",
  "Almost there...",
];

const WorkingAnimation = ({ answer }: WorkingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Simulate typing the answer
    let index = 0;
    const typeTimer = setInterval(() => {
      if (index <= answer.length) {
        setDisplayedText(answer.slice(0, index));
        index++;
      } else {
        clearInterval(typeTimer);
      }
    }, 30);

    // Cycle through working messages
    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % workingMessages.length);
    }, 2000);

    return () => {
      clearInterval(typeTimer);
      clearInterval(messageTimer);
    };
  }, [answer]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl"
    >
      {/* Terminal-like display */}
      <div className="bg-secondary/80 rounded-xl border border-border overflow-hidden backdrop-blur-sm">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-4 text-sm text-muted-foreground font-mono">
            artin_ai.process()
          </span>
        </div>
        
        {/* Terminal content */}
        <div className="p-4 font-mono text-sm space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-primary">→</span>
            <span className="text-muted-foreground">Recording response:</span>
          </div>
          
          <div className="pl-6 text-foreground">
            "{displayedText}"
            <motion.span
              className="inline-block w-2 h-4 bg-primary ml-1 typing-cursor"
            />
          </div>
          
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 pt-2"
          >
            <motion.div
              className="flex gap-1"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
            <span className="text-muted-foreground text-xs">
              {workingMessages[messageIndex]}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkingAnimation;
