export const generateTableHTML = (data, fromDate = "", toDate = "null") => {
    // Calculate totals
    const totalCredit = data.reduce((acc, item) => acc + (Number(item.credit) || 0), 0);
    const totalDebit = data.reduce((acc, item) => acc + (Number(item.debit) || 0), 0);
    const balance = totalCredit - totalDebit;

    const formatDate = (date) => {
        if (!date) return "N/A";
        return typeof date === 'string' ? date : date.toLocaleDateString();
    };

    const fromDateFormatted = formatDate(fromDate);
    const toDateFormatted = formatDate(toDate);

    let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Summary Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                    color: #333;
                    line-height: 1.6;
                }
                h1 {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #2c3e50;
                    font-size: 28px;
                }
                .report-header {
                    margin-bottom: 30px;
                }
                .date-range {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                    border-left: 5px solid #3498db;
                    font-size: 16px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .date-range span {
                    font-weight: bold;
                    color: #2980b9;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 30px 0;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px 15px;
                    text-align: left;
                }
                th {
                    background-color: #3498db;
                    color: white;
                    font-weight: bold;
                    font-size: 14px;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:hover {
                    background-color: #f1f1f1;
                }
                .total-row {
                    font-weight: bold;
                    background-color: #edf2f7;
                }
                .final-total {
                    text-align: right;
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 30px;
                    padding: 15px;
                    background-color: #f8f9fa;
                    border-radius: 8px;
                    border-left: 5px solid #27ae60;
                }
            </style>
        </head>
        <body>
            <div class="report-header">
                <h1>Summary Report</h1>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
                
                <div class="date-range">
                    <div>Statement Period:</div>
                    <div>From: <span>${fromDateFormatted}</span> To: <span>${toDateFormatted}</span></div>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Credit</th>
                        <th>Debit</th>
                    </tr>
                </thead>
                <tbody>
    `;

    // Add table rows
    data.forEach((item, index) => {
        htmlContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.title}</td>
                <td>${item.credit || '-'}</td>
                <td>${item.debit || '-'}</td>
            </tr>
        `;
    });

    // Add total row
    htmlContent += `
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="2"><strong>TOTAL</strong></td>
                        <td><strong>${totalCredit}</strong></td>
                        <td><strong>${totalDebit}</strong></td>
                    </tr>
                </tfoot>
            </table>
            
            <div class="final-total">
                FINAL BALANCE: ${balance} /-
            </div>
        </body>
        </html>
    `;

    return htmlContent;
};