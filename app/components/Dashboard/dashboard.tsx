"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  TrendingUp,
  Calendar,
  BarChart3,
  Plus,
  Eye,
  Target,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface MetricCard {
  icon: React.ElementType;
  label: string;
  value: string | number;
  iconColor: string;
  bgGradient: string;
  borderColor: string;
}

interface QuickAction {
  icon: React.ElementType;
  label: string;
  path: string;
  iconColor: string;
  bgGradient: string;
  borderColor: string;
}

const Dashboard = () => {
  const router = useRouter();

  const metrics: MetricCard[] = [
    {
      icon: Target,
      label: "Active Projects",
      value: "0",
      iconColor: "text-blue-400",
      bgGradient: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Sparkles,
      label: "In Progress",
      value: "0",
      iconColor: "text-yellow-400",
      bgGradient: "from-yellow-500/10 to-yellow-600/5",
      borderColor: "border-yellow-500/30",
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: "0%",
      iconColor: "text-green-400",
      bgGradient: "from-green-500/10 to-green-600/5",
      borderColor: "border-green-500/30",
    }
  ];

  const quickActions: QuickAction[] = [
    {
      icon: BarChart3,
      label: "Competitor Analysis",
      path: "/dashboard/analysis",
      iconColor: "text-emerald-400",
      bgGradient: "from-emerald-500/10 to-emerald-600/5",
      borderColor: "border-emerald-500/30",
    },
    {
      icon: Sparkles,
      label: "Content Planning",
      path: "/dashboard/planning",
      iconColor: "text-amber-400",
      bgGradient: "from-amber-500/10 to-amber-600/5",
      borderColor: "border-amber-500/30",
    },
    {
      icon: FileText,
      label: "Generate Content",
      path: "/dashboard/content",
      iconColor: "text-blue-400",
      bgGradient: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Eye,
      label: "View Analytics",
      path: "/dashboard/analysis",
      iconColor: "text-purple-400",
      bgGradient: "from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-500/30",
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-8 space-y-8 relative">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
          Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome back! Here's your content overview.
        </p>
      </motion.div>

      {/* Content Overview Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4 relative z-10"
      >
        <h2 className="text-xl font-semibold text-foreground">
          Content Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`relative bg-gradient-to-br ${metric.bgGradient} backdrop-blur-sm border ${metric.borderColor} rounded-xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden group`}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.bgGradient} border ${metric.borderColor}`}>
                    <metric.icon
                      className={`w-6 h-6 ${metric.iconColor}`}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-foreground">
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {metric.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4 relative z-10"
      >
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(action.path)}
              className={`relative bg-gradient-to-br ${action.bgGradient} backdrop-blur-sm border ${action.borderColor} rounded-xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col items-center justify-center gap-4 group overflow-hidden`}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${action.bgGradient} border ${action.borderColor} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon
                    className={`w-8 h-8 ${action.iconColor}`}
                  />
                </div>
                <span className="text-sm font-semibold text-foreground text-center block">
                  {action.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

