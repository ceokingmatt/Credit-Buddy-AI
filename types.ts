
export enum DisputeStrategy {
  AI_OPTIMIZED = "AI Optimized (Best Match)",
  METRO2 = "Metro 2 Compliance (Technical)",
  AGGRESSIVE = "Aggressive / Section 609",
  NOT_MINE = "Not Mine / Fraud",
  LATE_PAYMENT = "Never Late",
  INACCURATE_BALANCE = "Inaccurate Balance",
  UNVERIFIABLE = "Unverifiable / No Contract",
  DUPLICATE = "Duplicate Account",
  DEBT_VALIDATION = "Debt Validation Request",
  CEASE_AND_DESIST = "Cease and Desist (Stop Contact)",
  ITS = "Notice of Intent to Sue (ITS)",
  ARBITRATION = "Demand for Arbitration"
}

export interface DisputeItem {
  id: string;
  creditorName: string;
  accountNumber: string; // Masked
  reason: string;
  amount?: string;
  status: string;
  selected: boolean;
  strategy: DisputeStrategy;
}

export interface ClientInfo {
  fullName: string;
  email?: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dob: string;
  ssnLast4: string;
}

export interface GeneratedLetter {
  id: string;
  bureau: 'Equifax' | 'Experian' | 'TransUnion';
  content: string;
  status: 'generated' | 'ready' | 'mailed';
  createdAt: number;
  round: number;
}

export type ScanInput = 
  | { type: 'text'; value: string }
  | { type: 'file'; value: string; mimeType: string };

export interface UploadedDocs {
  identity?: string;
  address?: string;
}

export enum AppStep {
  LANDING = 'LANDING',
  BLOG = 'BLOG',
  PRICING = 'PRICING',
  SIGN_UP = 'SIGN_UP',
  SCANNER = 'SCANNER',
  DASHBOARD = 'DASHBOARD',
  GENERATOR = 'GENERATOR',
  PREVIEW = 'PREVIEW',
  ONBOARDING = 'ONBOARDING',
  CHECKOUT = 'CHECKOUT',
  SAVED_LETTERS = 'SAVED_LETTERS',
  ADMIN = 'ADMIN'
}