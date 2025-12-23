import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  Image,
  MessageSquare,
  FileEdit,
  Edit3,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { ContentPost, PostStatus, ContentType } from "../../types/content";
import { useState } from "react";

const contentTypeIcons: Record<ContentType, React.ReactNode> = {
  instagram: <Image className="w-4 h-4" />,
  twitter: <MessageSquare className="w-4 h-4" />,
  linkedin: <MessageSquare className="w-4 h-4" />,
  facebook: <MessageSquare className="w-4 h-4" />,
  tiktok: <Image className="w-4 h-4" />,
  blog: <FileEdit className="w-4 h-4" />,
};

const statusConfig: Record<PostStatus, { label: string; color: string; icon: React.ReactNode }> = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: <Edit3 className="w-3 h-3" /> },
  pending_approval: { label: "Pending Approval", color: "bg-yellow-500/20 text-yellow-400", icon: <Clock className="w-3 h-3" /> },
  approved: { label: "Approved", color: "bg-primary/20 text-primary", icon: <CheckCircle2 className="w-3 h-3" /> },
  scheduled: { label: "Scheduled", color: "bg-blue-500/20 text-blue-400", icon: <Calendar className="w-3 h-3" /> },
  published: { label: "Published", color: "bg-green-500/20 text-green-400", icon: <CheckCircle2 className="w-3 h-3" /> },
};

interface PostDetailModalProps {
  post: ContentPost | null;
  onClose: () => void;
  onApprove?: (postId: string) => void;
  onReject?: (postId: string, reason: string) => void;
  canApprove?: boolean;
}

const PostDetailModal = ({
  post,
  onClose,
  onApprove,
  onReject,
  canApprove = false,
}: PostDetailModalProps) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!post) return null;

  const status = statusConfig[post.status];

  const handleReject = () => {
    if (rejectionReason.trim() && onReject) {
      onReject(post.id, rejectionReason);
      setRejectionReason("");
      setShowRejectForm(false);
      onClose();
    }
  };

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
          className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-card rounded-2xl border border-border shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-card/95 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                {contentTypeIcons[post.contentType]}
              </div>
              <div>
                <h2 className="font-display font-semibold text-foreground">{post.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={status.color}>
                    {status.icon}
                    <span className="ml-1">{status.label}</span>
                  </Badge>
                  <span className="text-xs text-muted-foreground capitalize">
                    {post.contentType}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Image Preview */}
            {post.imageUrl && (
              <div className="rounded-lg overflow-hidden border border-border">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Content</label>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <User className="w-4 h-4" />
                  <span>Created by</span>
                </div>
                <p className="font-medium text-foreground mt-1">{post.createdBy}</p>
              </div>
              
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Created</span>
                </div>
                <p className="font-medium text-foreground mt-1">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>

              {post.scheduledDate && (
                <div className="p-3 rounded-lg bg-secondary/30 border border-border col-span-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Scheduled for</span>
                  </div>
                  <p className="font-medium text-foreground mt-1">
                    {new Date(post.scheduledDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}

              {post.approvedBy && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 col-span-2">
                  <div className="flex items-center gap-2 text-primary text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approved by</span>
                  </div>
                  <p className="font-medium text-foreground mt-1">{post.approvedBy}</p>
                </div>
              )}
            </div>

            {/* Approval Actions */}
            {canApprove && post.status === "pending_approval" && (
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="font-medium text-foreground">Review Actions</h3>
                
                {showRejectForm ? (
                  <div className="space-y-3">
                    <Textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Provide feedback for the content creator..."
                      className="bg-secondary/50 border-border focus:border-destructive"
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setShowRejectForm(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleReject}
                        disabled={!rejectionReason.trim()}
                      >
                        Confirm Rejection
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
                      onClick={() => setShowRejectForm(true)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Request Changes
                    </Button>
                    <Button
                      className="flex-1 gradient-primary text-primary-foreground"
                      onClick={() => {
                        onApprove?.(post.id);
                        onClose();
                      }}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PostDetailModal;
