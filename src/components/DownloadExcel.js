import React from "react";
import ExcelJS from "exceljs";
import saveAs from "file-saver";

function ExcelDownload({ data, filename }) {
  const handleDownload = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add headers
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Add data rows
    data.forEach((row) => {
      const values = headers.map((header) => row[header]);
      worksheet.addRow(values);
    });

    // Create a blob with the Excel data
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Use FileSaver.js to save the blob as a file
      saveAs(blob, `${filename}.xlsx`);
    });
  };

  return (
    <div>
      <button className="p-2 bg-green-400" onClick={handleDownload}>
        Download Excel
      </button>
    </div>
  );
}

export default ExcelDownload;
