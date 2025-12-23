import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  FileEdit,
  Calendar,
  Bell,
  ChevronRight,
  AlertCircle,
  Image,
  MessageSquare,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { ContentType, ApprovalTask, UserTask } from "../../types/content";

const contentTypeIcons: Record<ContentType, React.ReactNode> = {
  instagram: <Image className="w-4 h-4" />,
  twitter: <MessageSquare className="w-4 h-4" />,
  linkedin: <MessageSquare className="w-4 h-4" />,
  facebook: <MessageSquare className="w-4 h-4" />,
  tiktok: <Image className="w-4 h-4" />,
  blog: <FileEdit className="w-4 h-4" />,
};

interface DashboardSidebarProps {
  approvalTasks: ApprovalTask[];
  userTasks: UserTask[];
  onApprovalClick: (task: ApprovalTask) => void;
  onTaskClick: (task: UserTask) => void;
}

const DashboardSidebar = ({
  approvalTasks,
  userTasks,
  onApprovalClick,
  onTaskClick,
}: DashboardSidebarProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>("approvals");

  const pendingApprovals = approvalTasks.filter((t) => t.status === "pending");
  const incompleteTasks = userTasks.filter((t) => !t.completed);

  const priorityColors = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-yellow-500/20 text-yellow-400",
    high: "bg-destructive/20 text-destructive",
  };

  return (
    <div className="w-80 h-full bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-lg font-semibold text-foreground">Activity Center</h2>
        <p className="text-sm text-muted-foreground mt-1">Your pending tasks & approvals</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Approvals Section */}
          <div className="space-y-2">
            <button
              onClick={() => setExpandedSection(expandedSection === "approvals" ? null : "approvals")}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg gradient-primary">
                  <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <span className="font-medium text-foreground">Pending Approvals</span>
                  <p className="text-xs text-muted-foreground">{pendingApprovals.length} items waiting</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {pendingApprovals.length > 0 && (
                  <Badge variant="default" className="gradient-primary text-primary-foreground">
                    {pendingApprovals.length}
                  </Badge>
                )}
                <ChevronRight
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedSection === "approvals" ? "rotate-90" : ""
                  }`}
                />
              </div>
            </button>

            <AnimatePresence>
              {expandedSection === "approvals" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pt-2">
                    {pendingApprovals.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No pending approvals
                      </p>
                    ) : (
                      pendingApprovals.map((task) => (
                        <motion.button
                          key={task.id}
                          onClick={() => onApprovalClick(task)}
                          className="w-full p-3 rounded-lg border border-border bg-background hover:border-primary/50 transition-all text-left group"
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-1.5 rounded bg-secondary">
                              {contentTypeIcons[task.contentType]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                                {task.postTitle}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                by {task.requestedBy}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(task.requestedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tasks Section */}
          <div className="space-y-2">
            <button
              onClick={() => setExpandedSection(expandedSection === "tasks" ? null : "tasks")}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent">
                  <Bell className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="text-left">
                  <span className="font-medium text-foreground">Your Tasks</span>
                  <p className="text-xs text-muted-foreground">{incompleteTasks.length} tasks remaining</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {incompleteTasks.length > 0 && (
                  <Badge variant="secondary">{incompleteTasks.length}</Badge>
                )}
                <ChevronRight
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedSection === "tasks" ? "rotate-90" : ""
                  }`}
                />
              </div>
            </button>

            <AnimatePresence>
              {expandedSection === "tasks" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pt-2">
                    {incompleteTasks.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        All tasks completed!
                      </p>
                    ) : (
                      incompleteTasks.map((task) => (
                        <motion.button
                          key={task.id}
                          onClick={() => onTaskClick(task)}
                          className="w-full p-3 rounded-lg border border-border bg-background hover:border-primary/50 transition-all text-left group"
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-1.5 rounded ${
                                task.priority === "high"
                                  ? "bg-destructive/20"
                                  : "bg-secondary"
                              }`}
                            >
                              {task.priority === "high" ? (
                                <AlertCircle className="w-4 h-4 text-destructive" />
                              ) : (
                                <FileEdit className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                                  {task.title}
                                </p>
                                <Badge className={priorityColors[task.priority]} variant="secondary">
                                  {task.priority}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                {task.description}
                              </p>
                              {task.dueDate && (
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>

      {/* Quick Stats */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-secondary/50 text-center">
            <p className="text-2xl font-display font-bold text-primary">{pendingApprovals.length}</p>
            <p className="text-xs text-muted-foreground">Awaiting</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50 text-center">
            <p className="text-2xl font-display font-bold text-foreground">{incompleteTasks.length}</p>
            <p className="text-xs text-muted-foreground">Tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
