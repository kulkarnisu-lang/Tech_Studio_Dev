export type ThemeMode = 'light' | 'dark' | 'system';

export interface CompanyConfig {
  name: string;
  tagline: string;
  positioning: string;
  email: string;
  founderName: string;
  founderTitle: string;
  founderBio: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  calendarBookingUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  isFeatured?: boolean;
  capabilities: string[];
  deliverables: string[];
  icon: string;
  ctaText: string;
}

export interface AIWorkflowStage {
  id: string;
  number: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  keyOutcomes: string[];
  engineeringInsight: string;
  icon: string;
}

export interface AIUseCase {
  id: string;
  title: string;
  shortDesc: string;
  detailedOverview: string;
  practicalApplication: string[];
  engineeringBenefit: string;
  icon: string;
}

export interface SolutionItem {
  id: string;
  problemHeadline: string;
  challengeDetail: string;
  solutionTitle: string;
  approach: string[];
  keyOutcome: string;
  icon: string;
}

export interface ApproachStep {
  stepNumber: string;
  name: string;
  subtitle: string;
  description: string;
  activities: string[];
  output: string;
}

export interface EngagementModel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  idealFor: string;
  keyOfferings: string[];
  engagementFormat: string;
  ctaText: string;
}

export interface WhyUsItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface TechCategory {
  category: string;
  description: string;
  items: {
    name: string;
    description: string;
    badge?: string;
  }[];
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  problem: string[];
  approach: string;
  outcome: string;
  metrics: {
    label: string;
    value: string;
  }[];
  isPlaceholder?: boolean;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    score: number;
  }[];
}

export interface MaturityResult {
  level: 'Getting Started' | 'Developing' | 'Scaling' | 'AI-Augmented';
  scoreRange: string;
  summary: string;
  keyPriorities: string[];
  recommendedModel: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Services' | 'Automation' | 'AI' | 'Consulting';
}

export type InquiryStatus = 'new' | 'contacted' | 'in-progress' | 'closed';

export interface AdminInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  serviceInterest: string;
  message: string;
  createdAt: string;
  status: InquiryStatus;
  notes?: string;
  source: 'modal' | 'contact-form' | 'manual';
}

export interface AdminActivityLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  user: string;
}

export interface AdminCredentials {
  username: string;
  passcode: string;
  lastUpdated?: string;
}
