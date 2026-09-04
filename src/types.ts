export type PageStage = 'landing' | 'login' | 'portal';
export type PortalSubTab = 'dual' | 'pay' | 'guardian' | 'audit';
export type UserRole = 'senior' | 'guardian' | 'customer';

export interface GuardianInfo {
  name: string;
  relation: string;
  phone: string;
  webhookUrl: string;
}

export interface AuditItem {
  id: string;
  timestamp: string;
  payee: string;
  vpa: string;
  amount: number;
  riskScore: number;
  status: 'Escrow Hold' | 'Aborted & Frozen' | 'Advised & Paid' | 'Completed' | 'Guardian Cleared' | 'Guardian Authorized';
  notes: string;
}

export interface DynamicCapResult {
  baseCap: number;
  trustMultiplier: number;
  effectiveCap: number;
  reason: string;
}

export interface RiskEvaluationInput {
  amount: number;
  category: string;
  isCallActive: boolean;
  payeeVpa: string;
  historicalAvg: number;
}

export interface RiskEvaluationResult {
  score: number;
  tier: 'Low' | 'Medium' | 'High';
  deviationSurge: string;
  flags: string[];
  threatWarning: string;
}

export interface PresetScenario {
  id: string;
  name: string;
  payee: string;
  vpa: string;
  amount: number;
  category: string;
  isCallActive: boolean;
  expectedScore: number;
}
