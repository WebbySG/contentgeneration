import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AICharacter from "../Features/AICharacter";
import TypewriterText from "../Features/TypewriterText";
import OnboardingInput from "../Features/OnboardingInput";
import ProgressBar from "../Features/ProgressBar";
import WorkingAnimation from "../Features/WorkingAnimation";
import OnboardingComplete from "../Features/OnboardingComplete";

interface Question {
  id: string;
  question: string;
  placeholder: string;
  type?: "text" | "select" | "textarea" | "url" | "urls" | "keywords";
  options?: string[];
  multiSelect?: boolean;
  label?: string;
}

const questions: Question[] = [
  {
    id: "clientName",
    question: "Hey there! 👋 I'm Artin, your AI content strategist. Let's get to know you and your business. What's your name?",
    placeholder: "Enter your name...",
    type: "text",
    label: "Client name",
  },
  {
    id: "companyName",
    question: "Nice to meet you, {clientName}! What's your company or brand name?",
    placeholder: "Enter your company name...",
    type: "text",
    label: "Company name",
  },
  {
    id: "companyWebsite",
    question: "Great! What's your company website URL?",
    placeholder: "https://example.com",
    type: "url",
    label: "Company website URL",
  },
  {
    id: "targetKeywords",
    question: "Perfect! Now, let's talk about SEO. What are your target keywords? You can add multiple keywords.",
    placeholder: "Enter a keyword and press Enter or comma",
    type: "keywords",
    label: "Target keywords",
  },
  {
    id: "businessDescription",
    question: "Excellent keywords! Can you tell me more about your business? Please provide a brief description of what your company does.",
    placeholder: "Describe your business, products, services, and what makes you unique...",
    type: "textarea",
    label: "Business description",
  },
  {
    id: "competitorUrls",
    question: "Last question! To help me understand your competitive landscape, please provide up to 3 competitor website URLs.",
    placeholder: "https://competitor.com",
    type: "urls",
    label: "Competitor website URLs",
  },
];

type OnboardingPhase = "asking" | "typing-question" | "waiting-input" | "processing" | "complete" | "submitting";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<OnboardingPhase>("typing-question");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [lastAnswer, setLastAnswer] = useState("");
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const hasSubmittedRef = useRef(false);

  const currentQuestion = questions[currentStep];
  const isComplete = currentStep >= questions.length;

  // Replace placeholders in question text
  const getQuestionText = () => {
    let text = currentQuestion?.question || "";
    Object.entries(answers).forEach(([key, value]) => {
      text = text.replace(`{${key}}`, value);
    });
    return text;
  };

  const handleQuestionTyped = useCallback(() => {
    setPhase("waiting-input");
  }, []);

  const handleSubmit = useCallback((value: string) => {
    setLastAnswer(value);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    setPhase("processing");

    // Simulate AI processing time
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
        setPhase("typing-question");
      } else {
        setPhase("complete");
      }
    }, 2500);
  }, [currentQuestion, currentStep]);

  // Submit data to API
  const submitData = useCallback(async () => {
    setPhase("submitting");
    setSubmitStatus(null);
    try {
      const response = await fetch("/api/Onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

      if (data.code === 200) {
        setSubmitStatus({
          success: true,
          message: data.text || "Your data is successfully submitted",
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.text || "Failed to submit data",
        });
      }
    } catch (error) {
      console.error("Error submitting onboarding data:", error);
      setSubmitStatus({
        success: false,
        message: "An error occurred while submitting your data",
      });
    } finally {
      setPhase("complete");
    }
  }, [answers]);

  // Send data to API when form is complete (only once)
  useEffect(() => {
    if (phase === "complete" && Object.keys(answers).length === questions.length && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      submitData();
    }
  }, [phase, answers, submitData]);

  if (phase === "complete" || phase === "submitting" || isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <OnboardingComplete 
          answers={answers} 
          submitStatus={submitStatus}
          isSubmitting={phase === "submitting"}
          onRetry={submitData}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Progress bar */}
      <div className="relative z-10 p-6">
        <ProgressBar current={currentStep + 1} total={questions.length} />
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-4xl flex flex-col items-center space-y-8">
          
          {/* AI Character */}
          <motion.div
            layout
            className="relative"
          >
            <AICharacter 
              isTyping={phase === "processing"} 
              isThinking={phase === "typing-question"}
            />
          </motion.div>

          {/* Question / Working state */}
          <AnimatePresence mode="wait">
            {phase === "processing" ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <WorkingAnimation answer={lastAnswer} />
              </motion.div>
            ) : (
              <motion.div
                key={`question-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6 w-full"
              >
                {/* Question text */}
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground max-w-2xl mx-auto leading-relaxed">
                  {phase === "typing-question" ? (
                    <TypewriterText 
                      text={getQuestionText()} 
                      onComplete={handleQuestionTyped}
                      speed={30}
                    />
                  ) : (
                    getQuestionText()
                  )}
                </h2>

                {/* Input */}
                {phase === "waiting-input" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center pt-4"
                  >
                    <OnboardingInput
                      placeholder={currentQuestion.placeholder}
                      onSubmit={handleSubmit}
                      type={currentQuestion.type}
                      options={currentQuestion.options}
                      multiSelect={currentQuestion.multiSelect}
                      label={currentQuestion.label}
                    />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 text-center pb-6"
      >
        <p className="text-sm text-muted-foreground">
          Press <kbd className="px-2 py-1 bg-secondary rounded text-xs font-mono">Enter</kbd> to continue
        </p>
      </motion.div>
    </div>
  );
};

export default Onboarding;
