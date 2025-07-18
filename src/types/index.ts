export interface VideoProject {
  id: string;
  type: 'product-demo' | 'explainer' | 'tutorial' | 'brand-story' | 'social-ad' | 'custom';
  orientation: 'horizontal' | 'vertical';
  tone: 'professional' | 'casual' | 'energetic' | 'serious' | 'humorous' | 'inspirational';
  avatar: Avatar;
  script: string;
  needsScriptHelp: boolean;
  scriptRequirements: {
    targetAudience: string;
    keyMessages: string;
    duration: string;
    brandGuidelines: string;
  };
  plan: PricingPlan;
  status: ProjectStatus;
  createdAt: Date;
  deliveryDate: Date;
  finalVideoUrl?: string;
  revisions: Revision[];
  attachedFiles: File[];
  instructions: string;
  additionalNotes: string;
}

export interface Avatar {
  id: string;
  name: string;
  gender: 'male' | 'female';
  ethnicity: string;
  imageUrl: string;
  description: string;
  languages: string[];
  specialties: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  maxRevisions: number;
  deliveryDays: number;
  type: 'one-time' | 'subscription' | 'enterprise';
  billingPeriod?: 'weekly' | 'monthly' | 'yearly';
}

export interface ProjectStatus {
  stage: 'script-review' | 'production' | 'editing' | 'finalization' | 'delivered';
  progress: number;
  message: string;
  updatedAt: Date;
}

export interface Revision {
  id: string;
  description: string;
  status: 'pending' | 'approved' | 'completed';
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl: string;
}

export interface Subscription {
  id: string;
  planId: string;
  userId: string;
  status: 'active' | 'cancelled' | 'paused';
  videosUsed: number;
  videosRemaining: number;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  nextBillingDate: Date;
}

export interface EnterpriseContact {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  useCase: string;
  message: string;
}
