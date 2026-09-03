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

export function exportAuditPDF(logs: AuditItem[]): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow pop-ups to download the PDF report.');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>BankShield AI — Transaction & Duress Audit Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 28px; color: #18181b; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #059669; padding-bottom: 12px; margin-bottom: 20px; }
          .brand { font-size: 20px; font-weight: 800; color: #059669; }
          .meta { font-size: 11px; color: #71717a; text-align: right; }
          .summary { background: #f4f4f5; padding: 12px; border-radius: 8px; font-size: 12px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
          th { background: #f4f4f5; text-align: left; padding: 8px; font-weight: 700; border-bottom: 1px solid #e4e4e7; }
          td { padding: 8px; border-bottom: 1px solid #f4f4f5; vertical-align: top; }
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600; }
          .badge-hold { background: #ffe4e6; color: #e11d48; }
          .badge-frozen { background: #fee2e2; color: #b91c1c; }
          .badge-cleared { background: #dcfce7; color: #15803d; }
          .badge-safe { background: #ecfdf5; color: #047857; }
          .risk-high { font-weight: bold; color: #e11d48; }
          .risk-med { font-weight: bold; color: #d97706; }
          .risk-low { font-weight: bold; color: #059669; }
          @media print {
            body { padding: 0; }
            @page { margin: 1.5cm; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">BankShield.AI</div>
            <div style="font-size: 13px; font-weight: 600;">Transaction & Duress Incident Audit Report</div>
            <div style="font-size: 11px; color: #71717a;">Protected Customer: Ramesh Kumar (Age 68) | Designated Guardian: Ananya Kumar</div>
          </div>
          <div class="meta">
            <div>Generated: ${new Date().toLocaleString()}</div>
            <div>Compliance: RBI Digital Safety Guidelines</div>
          </div>
        </div>

        <div class="summary">
          <strong>Executive Forensics Summary:</strong> Immutable record of real-time payments, sub-50ms heuristic duress scoring, and guardian circuit-breaker interventions.
        </div>

        <table>
          <thead>
            <tr>
              <th>TXN ID</th>
              <th>Timestamp</th>
              <th>Payee & UPI VPA</th>
              <th>Amount (INR)</th>
              <th>Duress Score</th>
              <th>Final Outcome</th>
              <th>Incident Telemetry Notes</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map(log => {
              const riskClass = log.riskScore >= 75 ? 'risk-high' : log.riskScore >= 45 ? 'risk-med' : 'risk-low';
              const badgeClass = log.status.includes('Hold') ? 'badge-hold' : log.status.includes('Frozen') || log.status.includes('Aborted') ? 'badge-frozen' : log.status.includes('Cleared') ? 'badge-cleared' : 'badge-safe';
              return `
                <tr>
                  <td><strong>${log.id}</strong></td>
                  <td>${log.timestamp}</td>
                  <td><strong>${log.payee}</strong><br><span style="color:#71717a; font-size:10px;">${log.vpa}</span></td>
                  <td><strong>₹${log.amount.toLocaleString()}</strong></td>
                  <td class="${riskClass}">${log.riskScore} / 100</td>
                  <td><span class="badge ${badgeClass}">${log.status}</span></td>
                  <td style="color:#52525b;">${log.notes}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
        <script>
          window.onload = () => {
            window.print();
            window.onafterprint = () => window.close();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
