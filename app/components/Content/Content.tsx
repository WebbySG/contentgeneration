"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Target,
  CheckCircle2,
  X,
  AlertTriangle,
  Edit2,
  ArrowUpDown,
  Clock,
  FileText,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface Keyword {
  id: string;
  keyword: string;
  volume: number;
  difficulty: number;
  selected: boolean;
  isAISuggested: boolean;
}

interface PostTitle {
  id: string;
  title: string;
  keyword: string;
  keywordId: string;
  scheduledDate?: Date;
  status: "pending" | "approved" | "draft";
  isDuplicate?: boolean;
  selected: boolean;
}

interface MonthlyPlan {
  month: Date;
  posts: PostTitle[];
  totalPosts: number;
  approvedPosts: number;
  pendingPosts: number;
}

type ApprovalStatus = "pending" | "approved";

const Content = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(["1", "2", "3"]);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"calendar" | "table">("table");
  const [editingKeyword, setEditingKeyword] = useState<string | null>(null);

  // Mock data - AI Suggested Keywords
  const availableKeywords: Keyword[] = [
    { id: "1", keyword: "digital marketing strategy", volume: 12000, difficulty: 65, selected: true, isAISuggested: true },
    { id: "2", keyword: "content marketing tips", volume: 8500, difficulty: 58, selected: true, isAISuggested: true },
    { id: "3", keyword: "SEO best practices", volume: 15000, difficulty: 72, selected: true, isAISuggested: false },
    { id: "4", keyword: "social media marketing", volume: 9800, difficulty: 55, selected: false, isAISuggested: true },
    { id: "5", keyword: "email marketing campaigns", volume: 7200, difficulty: 48, selected: false, isAISuggested: false },
    { id: "6", keyword: "brand identity design", volume: 4200, difficulty: 38, selected: false, isAISuggested: true },
    { id: "7", keyword: "web development trends", volume: 11000, difficulty: 62, selected: false, isAISuggested: false },
    { id: "8", keyword: "e-commerce optimization", volume: 6800, difficulty: 45, selected: false, isAISuggested: true },
  ];

  // Mock data - Post Titles
  const allPosts: PostTitle[] = [
    { id: "p1", title: "10 Digital Marketing Strategies That Actually Work in 2024", keyword: "digital marketing strategy", keywordId: "1", status: "approved", selected: false, scheduledDate: new Date(2024, 0, 15) },
    { id: "p2", title: "Content Marketing Tips: How to Create Engaging Content", keyword: "content marketing tips", keywordId: "2", status: "pending", selected: false, scheduledDate: new Date(2024, 0, 20) },
    { id: "p3", title: "SEO Best Practices: A Complete Guide for Beginners", keyword: "SEO best practices", keywordId: "3", status: "pending", selected: false, scheduledDate: new Date(2024, 0, 25) },
    { id: "p4", title: "Social Media Marketing: Boost Your Brand's Online Presence", keyword: "social media marketing", keywordId: "4", status: "draft", selected: false, isDuplicate: true },
    { id: "p5", title: "Email Marketing Campaigns: Drive More Conversions", keyword: "email marketing campaigns", keywordId: "5", status: "pending", selected: false },
    { id: "p6", title: "Brand Identity Design: Creating a Memorable Visual Identity", keyword: "brand identity design", keywordId: "6", status: "approved", selected: false, scheduledDate: new Date(2024, 1, 5) },
    { id: "p7", title: "Web Development Trends: What's Hot in 2024", keyword: "web development trends", keywordId: "7", status: "pending", selected: false },
    { id: "p8", title: "E-commerce Optimization: Increase Your Sales", keyword: "e-commerce optimization", keywordId: "8", status: "draft", selected: false, isDuplicate: true },
  ];

  // Calculate 12-month roadmap progress
  const roadmapProgress = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    const monthPosts = allPosts.filter(p => 
      p.scheduledDate && 
      p.scheduledDate.getMonth() === date.getMonth() &&
      p.scheduledDate.getFullYear() === date.getFullYear()
    );
    return {
      month: date,
      total: 12,
      completed: monthPosts.filter(p => p.status === "approved").length,
      pending: monthPosts.filter(p => p.status === "pending").length,
    };
  });

  const currentMonthPosts = allPosts.filter(p => 
    p.scheduledDate &&
    p.scheduledDate.getMonth() === selectedMonth.getMonth() &&
    p.scheduledDate.getFullYear() === selectedMonth.getFullYear()
  );

  const duplicatePosts = allPosts.filter(p => p.isDuplicate);

  const toggleKeyword = (keywordId: string) => {
    if (selectedKeywords.includes(keywordId)) {
      setSelectedKeywords(selectedKeywords.filter(id => id !== keywordId));
    } else {
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

  const swapKeyword = (postId: string, newKeywordId: string) => {
    // In real implementation, this would update the post's keyword
    console.log(`Swapping keyword for post ${postId} to ${newKeywordId}`);
  };

  const approvePost = (postId: string) => {
    // In real implementation, this would update the post status
    console.log(`Approving post ${postId}`);
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getStatusBadge = (status: ApprovalStatus | "draft") => {
    const styles = {
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      approved: "bg-green-500/10 text-green-400 border-green-500/30",
      draft: "bg-gray-500/10 text-gray-400 border-gray-500/30",
    };
    const labels = {
      pending: "Pending",
      approved: "Approved",
      draft: "Draft",
    };
    return (
      <span className={cn("px-2 py-1 rounded text-xs font-medium border", styles[status])}>
        {labels[status]}
      </span>
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(selectedMonth.getMonth() + (direction === "next" ? 1 : -1));
    setSelectedMonth(newDate);
  };

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
            Content
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Manage and approve your content posts
          </p>
        </div>
      </motion.div>

      {/* Keyword List (AI-suggested + selectable) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Keywords</h2>
              <p className="text-sm text-muted-foreground mt-1">AI-suggested keywords for content creation</p>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {availableKeywords.filter(k => k.isAISuggested).length} AI Suggested
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {availableKeywords.map((keyword, index) => {
              const isSelected = selectedKeywords.includes(keyword.id);
              return (
                <motion.div
                  key={keyword.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => toggleKeyword(keyword.id)}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all relative group",
                    isSelected
                      ? "bg-primary/10 border-primary"
                      : "bg-background border-border hover:bg-secondary",
                    keyword.isAISuggested && "ring-2 ring-purple-500/20"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{keyword.keyword}</h3>
                        {keyword.isAISuggested && (
                          <span className="px-1.5 py-0.5 bg-purple-500/10 border border-purple-500/30 rounded text-xs text-purple-400">
                            AI
                          </span>
                        )}
                      </div>
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Monthly Content Plan View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Monthly Content Plan</h2>
              <p className="text-sm text-muted-foreground mt-1">{formatMonth(selectedMonth)}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("prev")}
                className="border-border"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("next")}
                className="border-border"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-1.5">
                <button
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "px-3 py-1 rounded text-sm font-medium transition-colors",
                    viewMode === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("calendar")}
                  className={cn(
                    "px-3 py-1 rounded text-sm font-medium transition-colors",
                    viewMode === "calendar" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Calendar
                </button>
              </div>
            </div>
          </div>

          {viewMode === "table" ? (
            <div className="space-y-3">
              {currentMonthPosts.length > 0 ? (
                currentMonthPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-foreground">{post.title}</h3>
                          {post.isDuplicate && (
                            <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-400 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Duplicate
                            </span>
                          )}
                          {getStatusBadge(post.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Keyword: {post.keyword}</span>
                          {post.scheduledDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.scheduledDate)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => swapKeyword(post.id, post.keywordId)}
                          className="border-border"
                        >
                          <ArrowUpDown className="w-4 h-4 mr-1" />
                          Swap
                        </Button>
                        {post.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => approvePost(post.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No posts scheduled for this month
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate() }).map((_, day) => {
                const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day + 1);
                const dayPosts = allPosts.filter(p => 
                  p.scheduledDate &&
                  p.scheduledDate.getDate() === date.getDate() &&
                  p.scheduledDate.getMonth() === date.getMonth() &&
                  p.scheduledDate.getFullYear() === date.getFullYear()
                );
                return (
                  <div
                    key={day}
                    className={cn(
                      "min-h-[80px] p-2 border border-border rounded-lg",
                      day === new Date().getDate() - 1 && selectedMonth.getMonth() === new Date().getMonth() && "border-primary bg-primary/5"
                    )}
                  >
                    <div className="text-xs font-medium text-muted-foreground mb-1">{day + 1}</div>
                    {dayPosts.map(post => (
                      <div
                        key={post.id}
                        className={cn(
                          "text-xs p-1 rounded mb-1 truncate",
                          post.status === "approved" ? "bg-green-500/20 text-green-400" :
                          post.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-gray-500/20 text-gray-400"
                        )}
                      >
                        {post.title.slice(0, 20)}...
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Post Title Cards (Select / Approve) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Post Title Cards</h2>
              <p className="text-sm text-muted-foreground mt-1">Select and approve posts for your content plan</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allPosts.map((post, index) => {
              const isSelected = selectedPosts.includes(post.id);
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={cn(
                    "p-4 rounded-lg border transition-all cursor-pointer relative group",
                    isSelected
                      ? "bg-primary/10 border-primary"
                      : "bg-background border-border hover:bg-secondary",
                    post.isDuplicate && "border-yellow-500/50 bg-yellow-500/5"
                  )}
                  onClick={() => togglePost(post.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-2 line-clamp-2">{post.title}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        {getStatusBadge(post.status)}
                        {post.isDuplicate && (
                          <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-400">
                            Duplicate
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="p-1 rounded bg-primary/20">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Keyword: {post.keyword}</p>
                    {post.scheduledDate && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.scheduledDate)}
                      </p>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        swapKeyword(post.id, post.keywordId);
                      }}
                      className="flex-1 border-border"
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    {post.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          approvePost(post.id);
                        }}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Long-term Roadmap Indicator (12-month progress) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10"
      >
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">12-Month Content Roadmap</h2>
            <p className="text-sm text-muted-foreground mt-1">Track your content progress over the year</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {roadmapProgress.map((month, index) => {
              const progress = (month.completed / month.total) * 100;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <div className="text-center mb-3">
                    <p className="text-xs font-semibold text-foreground mb-1">
                      {month.month.toLocaleDateString("en-US", { month: "short" })}
                    </p>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <span className="text-green-400">{month.completed}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-foreground">{month.total}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {month.pending} pending
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Confirm & Proceed Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 flex justify-end"
      >
        <Button
          size="lg"
          className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          disabled={selectedPosts.length === 0}
        >
          Confirm & Proceed
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default Content;

