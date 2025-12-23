export type PostStatus = "draft" | "pending_approval" | "approved" | "scheduled" | "published";

export type ContentType = "instagram" | "twitter" | "linkedin" | "facebook" | "tiktok" | "blog";

export interface ContentPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  contentType: ContentType;
  status: PostStatus;
  scheduledDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  approvedBy?: string;
}

export interface ApprovalTask {
  id: string;
  postId: string;
  postTitle: string;
  contentType: ContentType;
  requestedBy: string;
  requestedAt: Date;
  status: "pending" | "approved" | "rejected";
}

export interface UserTask {
  id: string;
  title: string;
  description: string;
  type: "approval" | "review" | "edit" | "schedule";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  completed: boolean;
}
