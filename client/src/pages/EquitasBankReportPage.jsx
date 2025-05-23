import React, { useState } from "react";
import ReportForm from "../components/EquitasBank/EquitasBankReportForm";
import CombinedReport from "../components/EquitasBank/CombinedReport";
import { PDFViewer } from "@react-pdf/renderer";

function EquitasBankReportPage() {
  const [reportData, setReportData] = useState(null);

  return (
    <div>
      {!reportData ? (
        <ReportForm onSubmit={setReportData} />
      ) : (
        <PDFViewer width="100%" height="1000">
          <CombinedReport data={reportData} />
        </PDFViewer>
      )}
    </div>
  );
}

export default EquitasBankReportPage;
