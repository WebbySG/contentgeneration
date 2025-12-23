import { motion, AnimatePresence } from "framer-motion";

interface AICharacterProps {
  isTyping: boolean;
  isThinking?: boolean;
}

const AICharacter = ({ isTyping, isThinking = false }: AICharacterProps) => {
  return (
    <div className="relative w-64 h-64">
      {/* Glow effect behind character */}
      <motion.div
        className="absolute inset-0 rounded-full gradient-primary opacity-20 blur-3xl"
        animate={{
          scale: isTyping ? [1, 1.1, 1] : 1,
          opacity: isTyping ? [0.2, 0.3, 0.2] : 0.2,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Main character container */}
      <motion.div
        className="relative w-full h-full"
        animate={isTyping ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Robot body */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Head */}
          <motion.g
            animate={{
              rotateY: isTyping ? 25 : 0,
              rotateX: isTyping ? 10 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: "100px 80px" }}
          >
            {/* Head shape */}
            <rect
              x="50"
              y="40"
              width="100"
              height="80"
              rx="20"
              fill="hsl(222, 30%, 14%)"
              stroke="hsl(174, 72%, 56%)"
              strokeWidth="2"
            />
            
            {/* Face screen */}
            <rect
              x="60"
              y="50"
              width="80"
              height="55"
              rx="10"
              fill="hsl(222, 47%, 8%)"
            />
            
            {/* Eyes container */}
            <motion.g
              animate={{
                x: isTyping ? 8 : 0,
                y: isTyping ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Left eye */}
              <motion.ellipse
                cx="80"
                cy="72"
                rx={isThinking ? 6 : 8}
                ry={isThinking ? 2 : 8}
                fill="hsl(174, 72%, 56%)"
                animate={{
                  scaleY: isThinking ? [1, 0.2, 1] : 1,
                }}
                transition={{ duration: 2, repeat: isThinking ? Infinity : 0 }}
              />
              
              {/* Right eye */}
              <motion.ellipse
                cx="120"
                cy="72"
                rx={isThinking ? 6 : 8}
                ry={isThinking ? 2 : 8}
                fill="hsl(174, 72%, 56%)"
                animate={{
                  scaleY: isThinking ? [1, 0.2, 1] : 1,
                }}
                transition={{ duration: 2, repeat: isThinking ? Infinity : 0, delay: 0.1 }}
              />

              {/* Eye shine */}
              <circle cx="83" cy="69" r="2" fill="white" opacity="0.8" />
              <circle cx="123" cy="69" r="2" fill="white" opacity="0.8" />
            </motion.g>
            
            {/* Mouth / expression */}
            <motion.path
              d={isTyping ? "M 85 90 Q 100 95 115 90" : "M 85 88 Q 100 98 115 88"}
              stroke="hsl(174, 72%, 56%)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Antenna */}
            <line
              x1="100"
              y1="40"
              x2="100"
              y2="25"
              stroke="hsl(174, 72%, 56%)"
              strokeWidth="3"
            />
            <motion.circle
              cx="100"
              cy="20"
              r="6"
              fill="hsl(174, 72%, 56%)"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.g>
          
          {/* Body */}
          <rect
            x="65"
            y="125"
            width="70"
            height="50"
            rx="10"
            fill="hsl(222, 30%, 14%)"
            stroke="hsl(174, 72%, 56%)"
            strokeWidth="2"
          />
          
          {/* Chest light */}
          <motion.circle
            cx="100"
            cy="145"
            r="8"
            fill="hsl(174, 72%, 56%)"
            animate={{
              opacity: isTyping ? [0.5, 1, 0.5] : [0.8, 1, 0.8],
            }}
            transition={{ duration: isTyping ? 0.3 : 2, repeat: Infinity }}
          />
          
          {/* Arms */}
          <AnimatePresence>
            {isTyping && (
              <>
                {/* Left arm typing */}
                <motion.g
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 0.15, repeat: Infinity }}
                  style={{ transformOrigin: "65px 130px" }}
                >
                  <rect
                    x="35"
                    y="130"
                    width="30"
                    height="12"
                    rx="6"
                    fill="hsl(222, 30%, 14%)"
                    stroke="hsl(174, 72%, 56%)"
                    strokeWidth="2"
                  />
                </motion.g>
                
                {/* Right arm typing */}
                <motion.g
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [5, -5, 5] }}
                  transition={{ duration: 0.15, repeat: Infinity, delay: 0.075 }}
                  style={{ transformOrigin: "135px 130px" }}
                >
                  <rect
                    x="135"
                    y="130"
                    width="30"
                    height="12"
                    rx="6"
                    fill="hsl(222, 30%, 14%)"
                    stroke="hsl(174, 72%, 56%)"
                    strokeWidth="2"
                  />
                </motion.g>
              </>
            )}
            
            {!isTyping && (
              <>
                {/* Left arm resting */}
                <motion.rect
                  x="40"
                  y="135"
                  width="25"
                  height="12"
                  rx="6"
                  fill="hsl(222, 30%, 14%)"
                  stroke="hsl(174, 72%, 56%)"
                  strokeWidth="2"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                />
                
                {/* Right arm resting */}
                <motion.rect
                  x="135"
                  y="135"
                  width="25"
                  height="12"
                  rx="6"
                  fill="hsl(222, 30%, 14%)"
                  stroke="hsl(174, 72%, 56%)"
                  strokeWidth="2"
                />
              </>
            )}
          </AnimatePresence>
        </svg>
      </motion.div>
      
      {/* Keyboard when typing */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex gap-1 p-2 bg-secondary rounded-lg border border-border">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-3 bg-muted rounded-sm"
                  animate={{
                    y: [0, -2, 0],
                    backgroundColor: ["hsl(222, 30%, 14%)", "hsl(174, 72%, 56%)", "hsl(222, 30%, 14%)"],
                  }}
                  transition={{
                    duration: 0.15,
                    repeat: Infinity,
                    delay: i * 0.05,
                    repeatDelay: 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AICharacter;
