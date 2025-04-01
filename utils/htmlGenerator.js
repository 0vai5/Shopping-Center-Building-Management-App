export const generateHTML = (data) => {
  const { ownerName, ownerNo, flatNumber, slipNo, maintenance, $updatedAt, rooms, dues, month } = data;
  const buildingName = "Dhoraji Housing Relief Trust";
  const subTitle = "Mohallah Committee Shopping Centre";
  const totalDues = dues.reduce((sum, due) => sum + (due.maintenance * rooms), 0);
  const total = maintenance * rooms + totalDues;
    const date = new Date($updatedAt).toLocaleDateString();
  const htmlContent = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #fff;
        }
        .container {
          width: 80%;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #000;
          border-radius: 5px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 20px;
          font-weight: bold;
        }
        .header h2 {
          margin: 5px 0;
          font-size: 16px;
        }
        .details {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .details p {
          margin: 0;
          font-size: 14px;
        }
        .table-container {
          margin-top: 20px;
        }
        .table-container table {
          width: 100%;
          border-collapse: collapse;
        }
        .table-container th, .table-container td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        .table-container th {
          background-color: #f0f0f0;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
        }
        .footer p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${buildingName}</h1>
          <h2>${subTitle}</h2>
        </div>
        <div class="details">
          <p><strong>No.:</strong> ${slipNo}</p>
          <p><strong>Flat No.:</strong> ${flatNumber}</p>
          <p><strong>Total Rooms:</strong> ${rooms}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Received from Mr./Mrs.:</strong> ${ownerName}</p>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Amount (Rs)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Maintenance Charges - ${month}</td>
                <td>${maintenance * rooms} Rs.</td>
              </tr>
              ${
                dues.length > 0
                  ? dues
                      .map(
                        (due) => `
                        <tr>
                          <td>Maintenance Charges - ${due.month}</td>
                          <td>${due.maintenance * rooms} Rs.</td>
                        </tr>`
                      )
                      .join("")
                  : ""
              }
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>${total.toFixed(2)} Rs.</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="footer">
          <p>Mohallah Committee Shopping Centre</p>
          <p>Receiver Signature</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return htmlContent;
};