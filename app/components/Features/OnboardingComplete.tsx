import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import AICharacter from "./AICharacter";

interface OnboardingCompleteProps {
  answers: Record<string, string>;
  submitStatus?: { success: boolean; message: string } | null;
  isSubmitting?: boolean;
}

const OnboardingComplete = ({ answers, submitStatus, isSubmitting = false }: OnboardingCompleteProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center space-y-8"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 gradient-primary rounded-full blur-2xl opacity-30" />
        <div className="relative gradient-primary rounded-full p-6">
          <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
        </div>
      </motion.div>

      {/* Happy AI Character */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="scale-75"
      >
        <AICharacter isTyping={false} />
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <h1 className="text-4xl font-display font-bold text-foreground">
          <span className="text-gradient">Perfect!</span> All set up
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          I've got everything I need to help you create amazing content for{" "}
          <span className="text-primary font-medium">{answers.companyName || answers.clientName}</span>
        </p>
        
        {/* Submission Status */}
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <p className="text-sm text-muted-foreground">data is submitted</p>
          </motion.div>
        )}
        
        {submitStatus && !isSubmitting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 px-4 py-3 rounded-lg ${
              submitStatus.success
                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                : "bg-red-500/10 text-red-600 border border-red-500/20"
            }`}
          >
            <p className="text-sm font-medium">{submitStatus.message}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md gradient-card rounded-2xl border border-border p-6 space-y-4"
      >
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Your Profile Summary</span>
        </div>
        
        <div className="space-y-3 text-left">
          {Object.entries(answers).map(([key, value]) => (
            <div key={key} className="flex justify-between items-start gap-4">
              <span className="text-sm text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </span>
              <span className="text-sm text-foreground font-medium text-right flex-1">
                {value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={() => router.push("/dashboard")}
          className="gradient-primary text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl hover:opacity-90 transition-opacity animate-pulse-glow"
        >
          Go to Dashboard
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingComplete;
