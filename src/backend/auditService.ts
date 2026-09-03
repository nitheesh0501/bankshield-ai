import { AuditItem } from '../types';

export const INITIAL_AUDIT_LOGS: AuditItem[] = [
  {
    id: 'TXN-7094',
    timestamp: '10:42 AM',
    payee: 'DCP Cyber Cell Official Escrow',
    vpa: 'dcp.cyber.cell@official-escrow',
    amount: 85000,
    riskScore: 100,
    status: 'Escrow Hold',
    notes: '71x Baseline Surge, Authority Coercion Keyword, Active Call Telemetry',
  },
  {
    id: 'TXN-9042',
    timestamp: '09:15 AM',
    payee: 'DCP Cyber Cell Official Escrow',
    vpa: 'dcp.cyber.cell@official-escrow',
    amount: 85000,
    riskScore: 95,
    status: 'Aborted & Frozen',
    notes: 'Guardian Ananya remote freeze triggered via WhatsApp webhook link.',
  },
  {
    id: 'TXN-8819',
    timestamp: 'Yesterday',
    payee: 'Unknown Tech Support Pvt Ltd',
    vpa: 'quick.support@upi',
    amount: 9200,
    riskScore: 68,
    status: 'Advised & Paid',
    notes: 'Amber advisory acknowledged by user after voice warning.',
  },
  {
    id: 'TXN-8740',
    timestamp: '02 Sep 2026',
    payee: 'Fake Mumbai Police Customs Cell',
    vpa: 'mumbai.customs.pay@upi',
    amount: 120000,
    riskScore: 98,
    status: 'Aborted & Frozen',
    notes: 'Digital arrest pattern intercepted. Money returned to savings account.',
  },
  {
    id: 'TXN-8501',
    timestamp: '01 Sep 2026',
    payee: 'Apollo Pharmacy & Clinic',
    vpa: 'apollo.pharmacy@upi',
    amount: 2450,
    riskScore: 20,
    status: 'Completed',
    notes: 'Normal medical transaction verified.',
  },
  {
    id: 'TXN-8422',
    timestamp: '30 Aug 2026',
    payee: 'Nilgiris Daily Groceries',
    vpa: 'nilgiris.groceries@upi',
    amount: 350,
    riskScore: 8,
    status: 'Completed',
    notes: 'Routine daily grocery payment.',
  },
  {
    id: 'TXN-8290',
    timestamp: '28 Aug 2026',
    payee: 'Landlord Property Maintenance',
    vpa: 'landlord.rent@upi',
    amount: 18000,
    riskScore: 78,
    status: 'Guardian Cleared',
    notes: 'Monthly rent transfer verified and unlocked by Ananya.',
  },
];

export function appendAuditRecord(logs: AuditItem[], newRecord: AuditItem): AuditItem[] {
  return [newRecord, ...logs];
}

export function exportAuditCSV(logs: AuditItem[]): void {
  const headers = ['TXN ID', 'Timestamp', 'Payee Name', 'UPI VPA', 'Amount (INR)', 'Risk Score', 'Status', 'Notes'];
  const rows = logs.map(log => [
    log.id,
    log.timestamp,
    `"${log.payee}"`,
    log.vpa,
    log.amount,
    log.riskScore,
    log.status,
    `"${log.notes}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `bankshield-duress-audit_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
