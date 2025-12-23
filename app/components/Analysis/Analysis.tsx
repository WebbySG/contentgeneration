"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  BarChart3,
  RefreshCw,
  Globe,
  Users,
  Target,
  AlertCircle,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Minus,
  ExternalLink,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface Keyword {
  keyword: string;
  position: number;
  change: number;
  volume: number;
  difficulty: number;
}

interface Competitor {
  name: string;
  url: string;
  traffic: number;
  keywords: number;
  visibility: number;
}

const Analysis = () => {
  const [activeTab, setActiveTab] = useState<"client" | "competitors">("client");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data - replace with actual API data
  const websiteUrl = "https://example.com";
  const metrics = {
    traffic: { value: "12.5K", change: 8.2, trend: "up" as const },
    visibility: { value: "45%", change: 12.5, trend: "up" as const },
    rankings: { value: "156", change: -5.3, trend: "down" as const },
    keywords: { value: "234", change: 18.7, trend: "up" as const },
  };

  const keywords: Keyword[] = [
    { keyword: "digital marketing", position: 3, change: 2, volume: 12000, difficulty: 65 },
    { keyword: "seo services", position: 7, change: -1, volume: 8500, difficulty: 58 },
    { keyword: "content strategy", position: 12, change: 5, volume: 6200, difficulty: 45 },
    { keyword: "social media marketing", position: 18, change: -3, volume: 9800, difficulty: 72 },
    { keyword: "web design", position: 5, change: 1, volume: 15000, difficulty: 55 },
    { keyword: "brand identity", position: 22, change: 4, volume: 4200, difficulty: 38 },
  ];

  const competitors: Competitor[] = [
    { name: "Competitor A", url: "competitor-a.com", traffic: 25000, keywords: 450, visibility: 68 },
    { name: "Competitor B", url: "competitor-b.com", traffic: 18000, keywords: 320, visibility: 52 },
    { name: "Competitor C", url: "competitor-c.com", traffic: 15000, keywords: 280, visibility: 45 },
  ];

  const insights = [
    {
      type: "opportunity",
      title: "High-Volume Keywords Opportunity",
      description: "You're ranking #12 for 'content strategy' with 6.2K monthly searches. Optimize this page to reach top 3.",
    },
    {
      type: "warning",
      title: "Position Drop Alert",
      description: "'social media marketing' dropped 3 positions. Review recent changes and backlinks.",
    },
    {
      type: "success",
      title: "Strong Growth",
      description: "Your visibility increased by 12.5% this month. Keep up the great work!",
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getPositionColor = (position: number) => {
    if (position <= 3) return "text-green-400";
    if (position <= 10) return "text-blue-400";
    if (position <= 20) return "text-yellow-400";
    return "text-red-400";
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-4 h-4 text-green-400" />;
    if (change < 0) return <ArrowDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
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
            Analysis
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            SEO performance and competitor insights
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          className="border-border hover:bg-secondary"
        >
          <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
          {isRefreshing ? "Refreshing..." : "Refresh Analysis"}
        </Button>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("client")}
            className={cn(
              "px-6 py-3 font-medium text-sm transition-colors relative",
              activeTab === "client"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Client
            {activeTab === "client" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("competitors")}
            className={cn(
              "px-6 py-3 font-medium text-sm transition-colors relative",
              activeTab === "competitors"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Competitors
            {activeTab === "competitors" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        </div>
      </motion.div>

      {/* Website URL Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Analyzing</p>
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-foreground hover:text-primary flex items-center gap-2"
                >
                  {websiteUrl}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last updated</p>
              <p className="text-sm font-medium text-foreground">2 hours ago</p>
            </div>
          </div>
        </div>
      </motion.div>

      {activeTab === "client" && (
        <>
          {/* Key Metrics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10"
          >
            {[
              {
                label: "Traffic",
                value: metrics.traffic.value,
                change: metrics.traffic.change,
                trend: metrics.traffic.trend,
                icon: Eye,
                iconColor: "text-blue-400",
                bgGradient: "from-blue-500/10 to-blue-600/5",
                borderColor: "border-blue-500/30",
              },
              {
                label: "Visibility",
                value: metrics.visibility.value,
                change: metrics.visibility.change,
                trend: metrics.visibility.trend,
                icon: BarChart3,
                iconColor: "text-green-400",
                bgGradient: "from-green-500/10 to-green-600/5",
                borderColor: "border-green-500/30",
              },
              {
                label: "Rankings",
                value: metrics.rankings.value,
                change: metrics.rankings.change,
                trend: metrics.rankings.trend,
                icon: TrendingUp,
                iconColor: "text-purple-400",
                bgGradient: "from-purple-500/10 to-purple-600/5",
                borderColor: "border-purple-500/30",
              },
              {
                label: "Keywords",
                value: metrics.keywords.value,
                change: metrics.keywords.change,
                trend: metrics.keywords.trend,
                icon: Target,
                iconColor: "text-amber-400",
                bgGradient: "from-amber-500/10 to-amber-600/5",
                borderColor: "border-amber-500/30",
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`relative bg-gradient-to-br ${metric.bgGradient} backdrop-blur-sm border ${metric.borderColor} rounded-xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.bgGradient} border ${metric.borderColor}`}>
                      <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      metric.trend === "up" ? "text-green-400" : "text-red-400"
                    )}>
                      {getChangeIcon(metric.change)}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Ranking Keywords Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative z-10"
          >
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Ranking Keywords</h2>
                <p className="text-sm text-muted-foreground mt-1">Top performing keywords and their positions</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Keyword</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Position</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Change</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Volume</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywords.map((keyword, index) => (
                      <motion.tr
                        key={keyword.keyword}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="border-b border-border hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-foreground">{keyword.keyword}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn("font-semibold", getPositionColor(keyword.position))}>
                            #{keyword.position}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getChangeIcon(keyword.change)}
                            <span className={cn(
                              "text-sm font-medium",
                              keyword.change > 0 ? "text-green-400" : keyword.change < 0 ? "text-red-400" : "text-muted-foreground"
                            )}>
                              {keyword.change > 0 ? `+${keyword.change}` : keyword.change}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-foreground">{keyword.volume.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  keyword.difficulty < 40 ? "bg-green-400" :
                                  keyword.difficulty < 70 ? "bg-yellow-400" : "bg-red-400"
                                )}
                                style={{ width: `${keyword.difficulty}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{keyword.difficulty}%</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Keyword Position Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative z-10"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">Keyword Position Trend</h2>
                <p className="text-sm text-muted-foreground mt-1">Position changes over the last 30 days</p>
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {Array.from({ length: 30 }).map((_, index) => {
                  const height = Math.random() * 100;
                  const isRecent = index >= 25;
                  return (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-2 group"
                    >
                      <div
                        className={cn(
                          "w-full rounded-t transition-all duration-300 group-hover:opacity-80",
                          isRecent ? "bg-primary" : "bg-primary/40"
                        )}
                        style={{ height: `${height}%` }}
                      />
                      {index % 5 === 0 && (
                        <span className="text-xs text-muted-foreground">
                          {30 - index}d
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {activeTab === "competitors" && (
        <>
          {/* Competitor Comparison Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">Competitor Comparison</h2>
                <p className="text-sm text-muted-foreground mt-1">Compare your performance against competitors</p>
              </div>
              <div className="space-y-4">
                {competitors.map((competitor, index) => (
                  <motion.div
                    key={competitor.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{competitor.name}</h3>
                        <p className="text-sm text-muted-foreground">{competitor.url}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{competitor.traffic.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Traffic</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{competitor.keywords}</p>
                          <p className="text-xs text-muted-foreground">Keywords</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{competitor.visibility}%</p>
                          <p className="text-xs text-muted-foreground">Visibility</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${competitor.visibility}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{competitor.visibility}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Insights / Recommendations Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative z-10"
      >
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground">Insights & Recommendations</h2>
            <p className="text-sm text-muted-foreground mt-1">Actionable insights to improve your SEO performance</p>
          </div>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={cn(
                  "p-4 rounded-lg border",
                  insight.type === "opportunity" && "bg-blue-500/10 border-blue-500/30",
                  insight.type === "warning" && "bg-yellow-500/10 border-yellow-500/30",
                  insight.type === "success" && "bg-green-500/10 border-green-500/30"
                )}
              >
                <div className="flex items-start gap-3">
                  {insight.type === "opportunity" && (
                    <Target className="w-5 h-5 text-blue-400 mt-0.5" />
                  )}
                  {insight.type === "warning" && (
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  )}
                  {insight.type === "success" && (
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analysis;

