// Business Profile Types
export interface BusinessProfile {
    id: string;
    ownerName: string;
    companyName: string;
    companyUrl: string;
    keywords: string[];
    description: string;
    offerings: string;
    competitorUrls: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Competitor Analysis Types
  export interface KeywordRanking {
    keyword: string;
    position: number;
    searchVolume: number;
    difficulty: number;
    trend: "up" | "down" | "stable";
    url: string;
  }
  
  export interface CompetitorReport {
    id: string;
    url: string;
    name: string;
    isCompany: boolean;
    keywords: KeywordRanking[];
    topPages: { url: string; traffic: number; keywords: number }[];
    domainAuthority: number;
    organicTraffic: number;
    analyzedAt: Date;
  }
  
  // Content Planning Types
  export interface SuggestedKeyword {
    id: string;
    keyword: string;
    searchVolume: number;
    difficulty: number;
    opportunity: "high" | "medium" | "low";
    reason: string;
    selected: boolean;
  }
  
  export interface ContentTitle {
    id: string;
    title: string;
    keyword: string;
    platform: Platform;
    selected: boolean;
    scheduledWeek?: number;
  }
  
  export interface ContentPlan {
    id: string;
    month: number;
    year: number;
    postsPerMonth: number;
    selectedKeywords: SuggestedKeyword[];
    proposedTitles: ContentTitle[];
    status: "planning" | "titles_proposed" | "confirmed" | "in_progress";
    createdAt: Date;
  }
  
  // Platform Types
  export type Platform = "wordpress" | "facebook" | "instagram";
  
  export interface PlatformContent {
    platform: Platform;
    content: string;
    hashtags?: string[];
    imageUrl?: string;
    status: ContentApprovalStatus;
  }
  
  // Content Types for the new flow
  export type ContentApprovalStatus = 
    | "draft"
    | "content_pending"
    | "content_approved"
    | "image_pending"
    | "image_approved"
    | "social_pending"
    | "social_approved"
    | "scheduled"
    | "published";
  
  export interface TextRecommendation {
    id: string;
    type: "add" | "remove" | "change";
    location: string; // e.g., "Paragraph 2, Sentence 3"
    original?: string;
    suggestion: string;
    reason: string;
  }
  
  export interface ContentScore {
    overall: number;
    readability: number;
    seo: number;
    engagement: number;
    improvements: string[];
    textRecommendations: TextRecommendation[];
  }
  
  export interface SecondaryKeyword {
    keyword: string;
    searchVolume: number;
    relevance: "high" | "medium" | "low";
  }
  
  export interface GeneratedContent {
    id: string;
    titleId: string;
    title: string;
    keyword: string;
    focusKeywords: string[];
    secondaryKeywords: SecondaryKeyword[];
    metaDescription?: string;
    metaTags?: string[];
    wordpressContent: string;
    wordpressStatus: ContentApprovalStatus;
    imageUrl?: string;
    imageStatus: ContentApprovalStatus;
    facebookContent?: PlatformContent;
    instagramContent?: PlatformContent;
    scheduledDate?: Date;
    scheduledTime?: string;
    platforms: Platform[];
    score?: ContentScore;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Social Media Connection Types
  export interface SocialConnection {
    id: string;
    platform: "facebook" | "instagram";
    connected: boolean;
    accountName?: string;
    pageId?: string;
    pageName?: string;
    accessToken?: string;
    connectedAt?: Date;
  }
  
  export interface IntegrationSettings {
    n8nWebhookUrl?: string;
    facebookConnection?: SocialConnection;
    instagramConnection?: SocialConnection;
    facebookPages?: { id: string; name: string }[];
    instagramAccounts?: { id: string; username: string }[];
  }
  
  // Rankings Tracker Types
  export interface DailyRanking {
    date: Date;
    keyword: string;
    position: number;
    change: number;
    url: string;
  }
  
  export interface RankingsSnapshot {
    date: Date;
    rankings: DailyRanking[];
    averagePosition: number;
    topKeywords: number;
    improvedKeywords: number;
    declinedKeywords: number;
  }
  
  // Client/User Types
  export interface Client {
    id: string;
    name: string;
    email: string;
    companyName: string;
    businessProfile?: BusinessProfile;
    role: "agency" | "client";
    createdAt: Date;
  }
  
  // Workflow Step Types
  export type OnboardingStep = 
    | "welcome"
    | "personal_info"
    | "company_info"
    | "keywords"
    | "description"
    | "competitors"
    | "complete";
  
  export type WorkflowStep =
    | "onboarding"
    | "analysis"
    | "planning"
    | "content"
    | "calendar"
    | "rankings";
  