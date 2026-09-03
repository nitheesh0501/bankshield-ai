export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type TransactionStatus = 'COMPLETED' | 'HELD' | 'BLOCKED' | 'WARNING_PASSED';

export interface Transaction {
  id: string;
  timestamp: string;
  senderName: string;
  senderAccount: string;
  recipientName: string;
  recipientVpa: string;
  amount: number;
  baselineAmount: number;
  isActiveCall: boolean;
  riskScore: number;
  riskLevel: RiskLevel;
  riskReasons: string[];
  status: TransactionStatus;
  escrowExpiresAt: number; // Unix timestamp in ms
}

export interface RiskAnalysis {
  score: number;
  level: RiskLevel;
  reasons: string[];
  executionTimeMs: number;
}
