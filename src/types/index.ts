// User Types
export interface User {
  id: string;
  username: string;
  company: string;
  type: 'buyer' | 'seller';
  avatar: string;
  email: string;
  country: string;
  category: string;
  products: string[];
  creditScore: number;
  totalTransactions: number;
  rating: number;
  verified: boolean;
  preferredRegions?: string[];
}

// Dashboard Types
export interface DashboardData {
  user: User;
  metrics: {
    monthlyMatches: number;
    completedCalls: number;
    activeDeals: number;
    creditScore: number;
  };
  notifications: Notification[];
  quickActions: QuickAction[];
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
}

// Notification Types
export interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string;
  type: 'match' | 'call' | 'document' | 'login';
}

// AI Call Types
export interface AIAgent {
  id: string;
  name: string;
  languages: string[];
  specialty: string;
  callsCompleted: number;
  successRate: number;
  avatar: string;
}

export interface AICall {
  id: string;
  targetCompany: string;
  targetContact: string;
  targetPhone: string;
  targetCountry: string;
  language: string;
  requestedBy: string;
  callPurpose: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  callDate: string;
  callTime: string;
  duration: string | null;
  aiAgent: string;
  callSummary: CallSummary | null;
  followUpActions: FollowUpAction[];
}

export interface CallSummary {
  overview: string;
  keyPoints: string[];
  concerns: string[];
  nextSteps: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  businessPotential: 'high' | 'medium' | 'low';
}

export interface FollowUpAction {
  id: string;
  type: string;
  description: string;
  completed: boolean;
}

// Trade Process Types
export interface TradeProcessStep {
  id: number;
  step: string;
  status: 'completed' | 'in_progress' | 'pending';
  desc: string;
  progress: number;
}

// Document Types
export interface TradeDocument {
  id: number;
  name: string;
  type: 'PO' | 'LC' | 'LICENSE' | 'SPEC' | 'INVOICE' | 'PACKING' | 'COO' | 'BL';
  status: 'draft' | 'ready' | 'approved' | 'final' | 'template';
  desc: string;
}

// Market Analysis Types
export interface MarketData {
  sector: string;
  growthRate: number;
  trend: 'up' | 'stable' | 'down';
  insights: string[];
}

export interface TradingPartner {
  country: string;
  flag: string;
  specialty: string;
  status: 'active' | 'stable' | 'growing';
  matchingRate: number;
}

// Matching Types
export interface Match {
  buyer: User;
  seller: User;
  score: number;
  compatibility: 'excellent' | 'good' | 'fair';
}

// Login Types
export interface LoginForm {
  username: string;
  password: string;
}