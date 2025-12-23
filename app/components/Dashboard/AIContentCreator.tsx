import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Image,
  Wand2,
  Send,
  Calendar,
  Loader2,
  Copy,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { useToast } from "../../hooks/use-toast";
import { ContentType } from "../../types/content";

const contentTypes: { value: ContentType; label: string; maxLength: number }[] = [
  { value: "instagram", label: "Instagram", maxLength: 2200 },
  { value: "twitter", label: "Twitter/X", maxLength: 280 },
  { value: "linkedin", label: "LinkedIn", maxLength: 3000 },
  { value: "facebook", label: "Facebook", maxLength: 63206 },
  { value: "tiktok", label: "TikTok", maxLength: 2200 },
  { value: "blog", label: "Blog Post", maxLength: 10000 },
];

interface AIContentCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  onSubmitForApproval: (content: {
    title: string;
    content: string;
    imageUrl?: string;
    contentType: ContentType;
    scheduledDate?: Date;
  }) => void;
}

const AIContentCreator = ({
  isOpen,
  onClose,
  selectedDate,
  onSubmitForApproval,
}: AIContentCreatorProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"input" | "generating" | "review">("input");
  const [contentType, setContentType] = useState<ContentType>("instagram");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [title, setTitle] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<string>(
    selectedDate ? selectedDate.toISOString().split("T")[0] : ""
  );

  const tones = ["professional", "casual", "witty", "inspirational", "educational"];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Tell the AI what content you want to create.",
        variant: "destructive",
      });
      return;
    }

    setStep("generating");

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const selectedType = contentTypes.find((t) => t.value === contentType);
    
    // Mock generated content based on content type
    const mockContent = generateMockContent(contentType, topic, tone);
    setGeneratedContent(mockContent);
    setTitle(`${topic.slice(0, 50)}${topic.length > 50 ? "..." : ""}`);
    
    setStep("review");
  };

  const generateMockContent = (type: ContentType, topic: string, tone: string) => {
    const contents: Record<ContentType, string> = {
      instagram: `✨ ${topic}\n\nDiscover the power of strategic content that speaks to your audience. Every post is an opportunity to connect, inspire, and grow your community.\n\n💡 Pro tip: Consistency is key to building trust with your followers.\n\n#ContentCreation #DigitalMarketing #SocialMediaStrategy #BrandGrowth #ContentAgency`,
      twitter: `🚀 ${topic}\n\nGreat content doesn't just happen—it's crafted with intention and strategy.\n\nWhat's your content focus this week? 👇`,
      linkedin: `I've been thinking about ${topic} lately.\n\nIn today's fast-paced digital landscape, content isn't just king—it's the entire kingdom. Here's what I've learned:\n\n1️⃣ Authenticity resonates more than perfection\n2️⃣ Consistency builds trust over time\n3️⃣ Value-first content creates lasting connections\n\nThe brands winning today understand that every piece of content is a conversation, not a broadcast.\n\nWhat's your approach to content strategy? I'd love to hear your thoughts.`,
      facebook: `🎯 ${topic}\n\nWe're excited to share some insights that have been transforming how we approach content creation!\n\nThe secret? Understanding that great content starts with understanding your audience's needs, challenges, and aspirations.\n\nDrop a 💬 if you want to learn more about our content strategies!`,
      tiktok: `POV: You finally understand ${topic} 🤯\n\nThis changed everything for us 👇\n\n#ContentTips #MarketingHacks #LearnOnTikTok #BusinessGrowth`,
      blog: `# ${topic}: A Comprehensive Guide\n\n## Introduction\n\nIn today's digital-first world, understanding ${topic} has become essential for businesses looking to connect with their audience effectively.\n\n## Key Takeaways\n\n1. **Strategy First**: Before creating content, define your goals and understand your audience.\n\n2. **Quality Over Quantity**: One exceptional piece of content outperforms ten mediocre ones.\n\n3. **Measure & Iterate**: Use data to inform your content decisions and continuously improve.\n\n## Conclusion\n\nImplementing these strategies will help you create content that resonates and drives results.`,
    };

    return contents[type];
  };

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    
    // Simulate image generation
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    // Mock image URL (in real implementation, this would come from AI)
    setGeneratedImage("https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60");
    setIsGeneratingImage(false);
    
    toast({
      title: "Image generated!",
      description: "AI has created an image for your content.",
    });
  };

  const handleSubmitForApproval = () => {
    onSubmitForApproval({
      title,
      content: generatedContent,
      imageUrl: generatedImage || undefined,
      contentType,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : undefined,
    });

    toast({
      title: "Submitted for approval",
      description: "Your content has been sent for review.",
    });

    // Reset form
    setStep("input");
    setTopic("");
    setGeneratedContent("");
    setGeneratedImage("");
    setTitle("");
    onClose();
  };

  const handleRegenerate = () => {
    setStep("generating");
    setTimeout(() => {
      const newContent = generateMockContent(contentType, topic, tone);
      setGeneratedContent(newContent);
      setStep("review");
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-3xl max-h-[90vh] overflow-auto bg-card rounded-2xl border border-border shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-card/95 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-foreground">AI Content Creator</h2>
                <p className="text-sm text-muted-foreground">Let AI craft your perfect content</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6">
            {/* Step 1: Input */}
            {step === "input" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Content Type Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Platform</label>
                  <div className="flex flex-wrap gap-2">
                    {contentTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setContentType(type.value)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all font-medium text-sm ${
                          contentType === type.value
                            ? "border-primary bg-primary/20 text-primary"
                            : "border-border bg-secondary/50 text-foreground hover:border-primary/50"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topic Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    What do you want to post about?
                  </label>
                  <Textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Announce our new product launch, Share tips about content marketing, Promote upcoming webinar..."
                    className="min-h-[100px] bg-secondary/50 border-border focus:border-primary resize-none"
                  />
                </div>

                {/* Tone Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tone of voice</label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-3 py-1.5 rounded-full border transition-all text-sm capitalize ${
                          tone === t
                            ? "border-primary bg-primary/20 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Schedule Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Schedule for (optional)</label>
                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="bg-secondary/50 border-border focus:border-primary max-w-[200px]"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  className="w-full gradient-primary text-primary-foreground font-semibold py-6 text-lg"
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate Content with AI
                </Button>
              </motion.div>
            )}

            {/* Step 2: Generating */}
            {step === "generating" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 space-y-6"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="p-4 rounded-full gradient-primary"
                >
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <div className="text-center">
                  <h3 className="font-display font-semibold text-lg text-foreground">
                    AI is crafting your content...
                  </h3>
                  <p className="text-muted-foreground mt-1">This will only take a moment</p>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === "review" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-secondary/50 border-border focus:border-primary font-medium"
                  />
                </div>

                {/* Generated Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Generated Content</label>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {contentType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {generatedContent.length} / {contentTypes.find((t) => t.value === contentType)?.maxLength}
                      </span>
                    </div>
                  </div>
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="min-h-[200px] bg-secondary/50 border-border focus:border-primary resize-none font-mono text-sm"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleRegenerate}>
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Regenerate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedContent);
                        toast({ title: "Copied to clipboard!" });
                      }}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>

                {/* Image Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Image (optional)</label>
                  {generatedImage ? (
                    <div className="relative rounded-lg overflow-hidden border border-border">
                      <img
                        src={generatedImage}
                        alt="Generated content"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setGeneratedImage("")}
                        >
                          Remove Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={handleGenerateImage}
                      disabled={isGeneratingImage}
                      className="w-full py-8 border-dashed"
                    >
                      {isGeneratingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating image...
                        </>
                      ) : (
                        <>
                          <Image className="w-4 h-4 mr-2" />
                          Generate Image with AI
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Schedule */}
                {scheduledDate && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 border border-border">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Scheduled for:{" "}
                      <span className="text-foreground font-medium">
                        {new Date(scheduledDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep("input")} className="flex-1">
                    Back to Edit
                  </Button>
                  <Button
                    onClick={handleSubmitForApproval}
                    className="flex-1 gradient-primary text-primary-foreground font-semibold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit for Approval
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIContentCreator;
