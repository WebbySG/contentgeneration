"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Sparkles,
  Target,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  RefreshCw,
  X,
  Check,
  ArrowUpDown,
  Clock,
  FileText,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface Keyword {
  id: string;
  keyword: string;
  volume: number;
  difficulty: number;
  selected: boolean;
}

interface PostTitle {
  id: string;
  title: string;
  keyword: string;
  selected: boolean;
  isDuplicate?: boolean;
}

const ContentPlanning = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [keywordLimit] = useState(10);

  // Mock data
  const availableKeywords: Keyword[] = [
    { id: "1", keyword: "digital marketing strategy", volume: 12000, difficulty: 65, selected: false },
    { id: "2", keyword: "content marketing tips", volume: 8500, difficulty: 58, selected: false },
    { id: "3", keyword: "SEO best practices", volume: 15000, difficulty: 72, selected: false },
    { id: "4", keyword: "social media marketing", volume: 9800, difficulty: 55, selected: false },
    { id: "5", keyword: "email marketing campaigns", volume: 7200, difficulty: 48, selected: false },
    { id: "6", keyword: "brand identity design", volume: 4200, difficulty: 38, selected: false },
    { id: "7", keyword: "web development trends", volume: 11000, difficulty: 62, selected: false },
    { id: "8", keyword: "e-commerce optimization", volume: 6800, difficulty: 45, selected: false },
    { id: "9", keyword: "user experience design", volume: 9200, difficulty: 58, selected: false },
    { id: "10", keyword: "mobile app development", volume: 10500, difficulty: 68, selected: false },
    { id: "11", keyword: "data analytics insights", volume: 5600, difficulty: 42, selected: false },
    { id: "12", keyword: "cloud computing solutions", volume: 7800, difficulty: 52, selected: false },
  ];

  const generatedPosts: PostTitle[] = [
    { id: "p1", title: "10 Digital Marketing Strategies That Actually Work in 2024", keyword: "digital marketing strategy", selected: false },
    { id: "p2", title: "Content Marketing Tips: How to Create Engaging Content", keyword: "content marketing tips", selected: false },
    { id: "p3", title: "SEO Best Practices: A Complete Guide for Beginners", keyword: "SEO best practices", selected: false },
    { id: "p4", title: "Social Media Marketing: Boost Your Brand's Online Presence", keyword: "social media marketing", selected: false },
    { id: "p5", title: "Email Marketing Campaigns: Drive More Conversions", keyword: "email marketing campaigns", selected: false },
    { id: "p6", title: "Brand Identity Design: Creating a Memorable Visual Identity", keyword: "brand identity design", selected: false },
    { id: "p7", title: "Web Development Trends: What's Hot in 2024", keyword: "web development trends", selected: false },
    { id: "p8", title: "E-commerce Optimization: Increase Your Sales", keyword: "e-commerce optimization", selected: false, isDuplicate: true },
  ];

  const aiStrategy = {
    summary: "Based on your target keywords and competitor analysis, we recommend focusing on high-volume, medium-difficulty keywords. Your content should target 8-12 posts per month for optimal engagement.",
    focusAreas: ["SEO Optimization", "Content Quality", "User Engagement"],
    recommendedFrequency: "8-12 posts/month",
  };

  const roadmapMonths = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    return date;
  });

  const getMonthOptions = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() + i);
      months.push(date);
    }
    return months;
  };

  const toggleKeyword = (keywordId: string) => {
    if (selectedKeywords.includes(keywordId)) {
      setSelectedKeywords(selectedKeywords.filter(id => id !== keywordId));
    } else if (selectedKeywords.length < keywordLimit) {
      setSelectedKeywords([...selectedKeywords, keywordId]);
    }
  };

  const togglePost = (postId: string) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter(id => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };

  const swapKeyword = (fromId: string, toId: string) => {
    const newSelected = selectedKeywords.map(id => id === fromId ? toId : id);
    setSelectedKeywords(newSelected);
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const duplicatePosts = generatedPosts.filter(post => post.isDuplicate);

  return (
    <div className="min-h-screen p-6 md:p-8 space-y-6 relative">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between relative z-10"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            Content Planning
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Plan and organize your content strategy
          </p>
        </div>
      </motion.div>

      {/* Month Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Select Planning Month</h2>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Current: {formatMonth(new Date())}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {getMonthOptions().map((month, index) => {
              const isSelected = month.getMonth() === selectedMonth.getMonth() && 
                                 month.getFullYear() === selectedMonth.getFullYear();
              const isCurrent = month.getMonth() === new Date().getMonth() && 
                               month.getFullYear() === new Date().getFullYear();
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => setSelectedMonth(month)}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-all",
                    isSelected
                      ? "bg-primary/10 border-primary text-primary font-semibold"
                      : "bg-background border-border text-foreground hover:bg-secondary",
                    isCurrent && !isSelected && "border-primary/30"
                  )}
                >
                  {formatMonth(month)}
                  {isCurrent && !isSelected && (
                    <span className="ml-2 text-xs text-primary">(Current)</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* AI Strategy Summary Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">AI Strategy Summary</h3>
              <p className="text-sm text-muted-foreground mb-4">{aiStrategy.summary}</p>
              <div className="flex flex-wrap gap-2">
                {aiStrategy.focusAreas.map((area, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm text-purple-400"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Priority Keywords List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Priority Keywords</h2>
              <p className="text-sm text-muted-foreground mt-1">Select keywords to focus on this month</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {selectedKeywords.length}/{keywordLimit} selected
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableKeywords.map((keyword, index) => {
              const isSelected = selectedKeywords.includes(keyword.id);
              return (
                <motion.div
                  key={keyword.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => toggleKeyword(keyword.id)}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all relative group",
                    isSelected
                      ? "bg-primary/10 border-primary"
                      : "bg-background border-border hover:bg-secondary",
                    !isSelected && selectedKeywords.length >= keywordLimit && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">{keyword.keyword}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Vol: {keyword.volume.toLocaleString()}</span>
                        <span>Diff: {keyword.difficulty}%</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="p-1 rounded bg-primary/20">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Swap with:</span>
                      <select
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          if (e.target.value) swapKeyword(keyword.id, e.target.value);
                        }}
                        className="text-xs bg-background border border-border rounded px-2 py-1"
                      >
                        <option value="">Select keyword</option>
                        {availableKeywords
                          .filter(k => k.id !== keyword.id && !selectedKeywords.includes(k.id))
                          .map(k => (
                            <option key={k.id} value={k.id}>{k.keyword}</option>
                          ))}
                      </select>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Posting Frequency Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">Posting Frequency Recommendation</h3>
              <p className="text-2xl font-bold text-blue-400 mb-2">{aiStrategy.recommendedFrequency}</p>
              <p className="text-sm text-muted-foreground">
                Based on your industry standards and competitor analysis, this frequency will help maintain consistent engagement without overwhelming your audience.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Generated Post Titles List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10"
      >
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Generated Post Titles</h2>
              <p className="text-sm text-muted-foreground mt-1">Select posts to include in your content plan</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {selectedPosts.length} selected
              </span>
            </div>
          </div>
          {duplicatePosts.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-yellow-400">
                {duplicatePosts.length} duplicate post(s) detected
              </span>
            </div>
          )}
          <div className="space-y-3">
            {generatedPosts.map((post, index) => {
              const isSelected = selectedPosts.includes(post.id);
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className={cn(
                    "p-4 rounded-lg border transition-all cursor-pointer",
                    isSelected
                      ? "bg-primary/10 border-primary"
                      : "bg-background border-border hover:bg-secondary",
                    post.isDuplicate && "border-yellow-500/50 bg-yellow-500/5"
                  )}
                  onClick={() => togglePost(post.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                      isSelected
                        ? "bg-primary border-primary"
                        : "border-border"
                    )}>
                      {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-foreground">{post.title}</h3>
                        {post.isDuplicate && (
                          <span className="ml-2 px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-400">
                            Duplicate
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Keyword: {post.keyword}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* 1-Year Roadmap Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10"
      >
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setShowRoadmap(!showRoadmap)}
            className="w-full p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="text-left">
                <h2 className="text-lg font-semibold text-foreground">1-Year Content Roadmap</h2>
                <p className="text-sm text-muted-foreground">Preview your content strategy timeline</p>
              </div>
            </div>
            {showRoadmap ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
          <AnimatePresence>
            {showRoadmap && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 border-t border-border">
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20" />
                    {/* Timeline items */}
                    <div className="space-y-6">
                      {roadmapMonths.map((month, index) => (
                        <div key={index} className="relative flex items-start gap-4">
                          <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary">
                              {month.toLocaleDateString("en-US", { month: "short" })}
                            </span>
                          </div>
                          <div className="flex-1 pt-2">
                            <h3 className="font-semibold text-foreground mb-1">
                              {formatMonth(month)}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {index === 0 && "Focus on high-priority keywords and content optimization"}
                              {index === 1 && "Expand content topics and increase posting frequency"}
                              {index === 2 && "Seasonal content and campaign launches"}
                              {index >= 3 && "Ongoing optimization and content diversification"}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-xs px-2 py-1 bg-primary/10 border border-primary/30 rounded text-primary">
                                {8 + index} posts planned
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Confirm & Proceed Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 flex justify-end"
      >
        <Button
          size="lg"
          className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          disabled={selectedKeywords.length === 0 || selectedPosts.length === 0}
        >
          Confirm & Proceed
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default ContentPlanning;

