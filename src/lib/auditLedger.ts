import { AuditItem } from '../types/bankshield';

export const INITIAL_AUDIT_LOGS: AuditItem[] = [
  {
    txnId: 'TXN-7094',
    timestamp: '10:42 AM',
    payee: 'DCP Cyber Cell Official Escrow',
    vpa: 'dcp.cyber.cell@official-escrow',
    amount: 85000,
    status: 'Escrow Hold',
    riskScore: 100,
    hasActiveCall: true,
    notes: '71x Baseline Surge, Authority Coercion Keyword, Active Call Telemetry',
  },
  {
    txnId: 'TXN-9042',
    timestamp: '09:15 AM',
    payee: 'DCP Cyber Cell Official Escrow',
    vpa: 'dcp.cyber.cell@official-escrow',
    amount: 85000,
    status: 'Aborted & Frozen',
    riskScore: 95,
    hasActiveCall: true,
    notes: 'Guardian Ananya remote freeze triggered via WhatsApp webhook link.',
  },
  {
    txnId: 'TXN-8819',
    timestamp: 'Yesterday',
    payee: 'Unknown Tech Support Pvt Ltd',
    vpa: 'quick.support@upi',
    amount: 9200,
    status: 'Advised & Paid',
    riskScore: 68,
    hasActiveCall: false,
    notes: 'Amber advisory acknowledged by user after voice warning.',
  },
  {
    txnId: 'TXN-8740',
    timestamp: '02 Sep 2026',
    payee: 'Fake Mumbai Police Customs Cell',
    vpa: 'mumbai.customs.pay@upi',
    amount: 120000,
    status: 'Aborted & Frozen',
    riskScore: 98,
    hasActiveCall: true,
    notes: 'Digital arrest pattern intercepted. Money returned to savings account.',
  },
  {
    txnId: 'TXN-8501',
    timestamp: '01 Sep 2026',
    payee: 'Apollo Pharmacy & Clinic',
    vpa: 'apollo.pharmacy@upi',
    amount: 2450,
    status: 'Completed',
    riskScore: 20,
    hasActiveCall: false,
    notes: 'Normal medical transaction verified.',
  },
  {
    txnId: 'TXN-8422',
    timestamp: '30 Aug 2026',
    payee: 'Nilgiris Daily Groceries',
    vpa: 'nilgiris.groceries@upi',
    amount: 350,
    status: 'Completed',
    riskScore: 8,
    hasActiveCall: false,
    notes: 'Routine daily grocery payment.',
  },
  {
    txnId: 'TXN-8290',
    timestamp: '28 Aug 2026',
    payee: 'Landlord Property Maintenance',
    vpa: 'landlord.rent@upi',
    amount: 18000,
    status: 'Guardian Cleared',
    riskScore: 78,
    hasActiveCall: false,
    notes: 'Monthly rent transfer verified and unlocked by Ananya.',
  },
];

export function exportAuditLogsCSV(auditLogs: AuditItem[]) {
  const headers = ['TXN ID', 'Timestamp', 'Payee Name', 'UPI ID', 'Amount (INR)', 'Status', 'Risk Score', 'Active Call', 'Notes'];
  const rows = auditLogs.map(log => [
    log.txnId,
    log.timestamp,
    `"${log.payee}"`,
    log.vpa,
    log.amount,
    log.status,
    log.riskScore,
    log.hasActiveCall ? 'Yes' : 'No',
    `"${log.notes}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `bankshield_duress_audit_ledger_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
