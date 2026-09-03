import { RiskAnalysis, RiskLevel } from './types';

const COERCION_KEYWORDS = [
  'police',
  'cbi',
  'court',
  'escrow',
  'cyber',
  'customs',
  'arrest',
  'dcp',
  'officer',
  'verify',
  'verification',
  'tax',
  'fine',
  'penalty'
];

export function calculateRiskScore(
  amount: number,
  recipient: string,
  isActiveCall: boolean,
  baselineAmount: number = 1200
): RiskAnalysis {
  const startTime = performance.now();
  let score = 0;
  const reasons: string[] = [];

  const recipientLower = recipient.toLowerCase();

  // 1. Amount threshold analysis
  if (amount > 25000) {
    score += 45;
    reasons.push(`Extreme amount surge: ₹${amount.toLocaleString('en-IN')} is >20x normal average (₹${baselineAmount.toLocaleString('en-IN')})`);
  } else if (amount > 5000) {
    score += 20;
    reasons.push(`Unusual amount surge: ₹${amount.toLocaleString('en-IN')} exceeds ₹5,000 baseline threshold`);
  }

  // 2. Telemetry: Active phone call check
  if (isActiveCall) {
    score += 25;
    reasons.push('Active phone call in progress during transfer attempt (Coercion Indicator)');
  }

  // 3. Coercion / Authority keyword analysis
  const matchedKeywords = COERCION_KEYWORDS.filter(kw => recipientLower.includes(kw));
  if (matchedKeywords.length > 0) {
    score += 35;
    reasons.push(`Authority / Coercion keyword detected in recipient ("${matchedKeywords.join(', ')}")`);
  }

  // Cap score between 0 and 100
  const finalScore = Math.min(100, Math.max(0, score));

  let level: RiskLevel = 'LOW';
  if (finalScore >= 75) {
    level = 'HIGH';
  } else if (finalScore >= 45) {
    level = 'MEDIUM';
  }

  const endTime = performance.now();
  const executionTimeMs = parseFloat((endTime - startTime).toFixed(2));

  return {
    score: finalScore,
    level,
    reasons,
    executionTimeMs: Math.max(0.1, executionTimeMs),
  };
}
