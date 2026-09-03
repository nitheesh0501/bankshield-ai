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

export function exportAuditODS(logs: AuditItem[]): void {
  // Generate OpenDocument Spreadsheet XML payload (MIME: application/vnd.oasis.opendocument.spreadsheet)
  const odsXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
                         xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
                         xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0">
  <office:body>
    <office:spreadsheet>
      <table:table table:name="AuditHistory">
        <table:table-row>
          <table:table-cell><text:p>TXN ID</text:p></table:table-cell>
          <table:table-cell><text:p>Timestamp</text:p></table:table-cell>
          <table:table-cell><text:p>Payee / VPA</text:p></table:table-cell>
          <table:table-cell><text:p>Amount (INR)</text:p></table:table-cell>
          <table:table-cell><text:p>Duress Risk Score</text:p></table:table-cell>
          <table:table-cell><text:p>Status</text:p></table:table-cell>
          <table:table-cell><text:p>Audit Telemetry Notes</text:p></table:table-cell>
        </table:table-row>
        ${logs.map(log => `
        <table:table-row>
          <table:table-cell><text:p>${log.id}</text:p></table:table-cell>
          <table:table-cell><text:p>${log.timestamp}</text:p></table:table-cell>
          <table:table-cell><text:p>${log.payee} (${log.vpa})</text:p></table:table-cell>
          <table:table-cell><text:p>${log.amount}</text:p></table:table-cell>
          <table:table-cell><text:p>${log.riskScore}/100</text:p></table:table-cell>
          <table:table-cell><text:p>${log.status}</text:p></table:table-cell>
          <table:table-cell><text:p>${log.notes}</text:p></table:table-cell>
        </table:table-row>`).join('')}
      </table:table>
    </office:spreadsheet>
  </office:body>
</office:document-content>`;

  const blob = new Blob([odsXml], { type: 'application/vnd.oasis.opendocument.spreadsheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `BankShield-Duress-Audit-Report-${new Date().toISOString().split('T')[0]}.ods`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadAuditPDF(logs: AuditItem[]): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please enable pop-ups to generate and download the PDF report.');
    return;
  }

  const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>BankShield AI — Incident & Duress Audit Ledger</title>
      <style>
        @page { size: A4 landscape; margin: 15mm; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #09090b; margin: 0; padding: 12px; font-size: 11px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #059669; padding-bottom: 12px; margin-bottom: 16px; }
        .title { font-size: 18px; font-weight: 800; color: #059669; letter-spacing: -0.5px; }
        .subtitle { font-size: 11px; color: #52525b; margin-top: 3px; }
        .meta { text-align: right; font-size: 10px; color: #71717a; line-height: 1.5; }
        .tag { display: inline-block; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 9px; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        th { background: #f4f4f5; text-align: left; padding: 8px 10px; font-weight: 700; font-size: 10px; text-transform: uppercase; color: #52525b; border-bottom: 1px solid #e4e4e7; }
        td { padding: 8px 10px; border-bottom: 1px solid #f4f4f5; vertical-align: top; }
        .txn-id { font-family: monospace; font-weight: 700; color: #18181b; }
        .amount { font-family: monospace; font-weight: 800; font-size: 12px; }
        .score-pill { display: inline-block; padding: 2px 5px; border-radius: 4px; font-family: monospace; font-weight: 700; font-size: 10px; }
        .score-high { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
        .score-med { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
        .score-low { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
        .status-pill { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: 600; }
        .status-cleared { background: #dcfce7; color: #166534; }
        .status-frozen { background: #fee2e2; color: #991b1b; }
        .status-advised { background: #fef3c7; color: #854d0e; }
        .status-completed { background: #f4f4f5; color: #3f3f46; }
        .footer { margin-top: 24px; font-size: 9px; color: #a1a1aa; border-top: 1px solid #f4f4f5; padding-top: 8px; display: flex; justify-content: space-between; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="title">BankShield.AI <span class="tag">FORENSIC AUDIT LEDGER</span></div>
          <div class="subtitle">Protected Customer: <strong>Ramesh Kumar (Age 68)</strong> • Designated Guardian: <strong>Ananya Kumar</strong></div>
        </div>
        <div class="meta">
          <div>Report Timestamp: <strong>${new Date().toLocaleString()}</strong></div>
          <div>Security Compliance: <strong>RBI Contextual Fraud Directive</strong></div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>TXN ID</th>
            <th>Timestamp</th>
            <th>Payee & UPI VPA</th>
            <th>Amount (INR)</th>
            <th>Duress Risk</th>
            <th>Outcome Status</th>
            <th>Audit Telemetry Notes</th>
          </tr>
        </thead>
        <tbody>
          ${logs.map(l => {
            const scoreClass = l.riskScore >= 75 ? 'score-high' : l.riskScore >= 45 ? 'score-med' : 'score-low';
            const statusClass = l.status.includes('Cleared') ? 'status-cleared' : l.status.includes('Frozen') || l.status.includes('Aborted') ? 'status-frozen' : l.status.includes('Advised') ? 'status-advised' : 'status-completed';
            return `
              <tr>
                <td class="txn-id">${l.id}</td>
                <td style="color:#71717a;">${l.timestamp}</td>
                <td><strong>${l.payee}</strong><br><span style="font-size:9px; color:#71717a;">${l.vpa}</span></td>
                <td class="amount">₹${l.amount.toLocaleString()}</td>
                <td><span class="score-pill ${scoreClass}">${l.riskScore} / 100</span></td>
                <td><span class="status-pill ${statusClass}">${l.status}</span></td>
                <td style="color:#52525b;">${l.notes}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <div class="footer">
        <span>BankShield AI Edge Architecture • Real-Time Cognitive Duress Protection</span>
        <span>Page 1 of 1 • Tamper-Evident System Log</span>
      </div>

      <script>
        window.onload = () => {
          setTimeout(() => {
            window.print();
            window.onafterprint = () => window.close();
          }, 300);
        };
      <\/script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(content);
  printWindow.document.close();
}

export const exportAuditPDF = downloadAuditPDF;
