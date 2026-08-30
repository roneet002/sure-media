export interface Ipo {
  id: number;
  company: string;
  slug: string;
  type: 'MAINBOARD' | 'SME';
  status: string;
  openDate: string | null;
  closeDate: string | null;
  priceMin: number | null;
  priceMax: number | null;
  lotSize: number | null;
  issueSize: string | null;
  listingAt: string | null;
  gmp: number | null;
  subscription: string | null;
  description: string | null;
  sector: string | null;
}

export interface Broker {
  id: number;
  name: string;
  slug: string;
  type: 'DISCOUNT' | 'FULL_SERVICE';
  brokerage: string;
  accountOpening: string | null;
  rating: number;
  features: string | null;
  pros: string | null;
  cons: string | null;
  website: string | null;
  featured: boolean;
  popular: boolean;
}

export interface Ncd {
  id: number;
  company: string;
  slug: string;
  effectiveYield: number | null;
  issueDate: string | null;
  closeDate: string | null;
  minInvestment: string | null;
  rating: string | null;
  status: string;
}

export interface RightsIssue {
  id: number;
  company: string;
  slug: string;
  recordDate: string | null;
  issueDate: string | null;
  price: number | null;
  ratio: string | null;
  status: string;
}

export interface Buyback {
  id: number;
  company: string;
  slug: string;
  issueDate: string | null;
  recordDate: string | null;
  buybackPrice: number | null;
  size: string | null;
  status: string;
}

export interface Report {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string | null;
  content: string | null;
  published: boolean;
  createdAt: string;
}

export interface Alert {
  id: number;
  title: string;
  message: string;
  category: string;
  alertDate: string;
}

export interface DashboardStats {
  ipos: number;
  brokers: number;
  ncds: number;
  reports: number;
  alerts: number;
}

export interface AdminUser {
  id: number;
  email: string;
  name: string;
}
