export type PageStage = 'landing' | 'login' | 'portal';
export type PortalSubTab = 'dual' | 'pay' | 'guardian' | 'audit';
export type UserRole = 'ramesh' | 'ananya';
export type Language = 'en' | 'hi' | 'ta';

export interface AuditItem {
  txnId: string;
  timestamp: string;
  payee: string;
  vpa: string;
  amount: number;
  status: 'Escrow Hold' | 'Aborted & Frozen' | 'Advised & Paid' | 'Completed' | 'Guardian Cleared';
  riskScore: number;
  hasActiveCall: boolean;
  notes: string;
}

export interface RiskEvaluationResult {
  riskScore: number;
  tier: 'low' | 'medium' | 'critical';
  reasons: string[];
  multiplier: string;
}
