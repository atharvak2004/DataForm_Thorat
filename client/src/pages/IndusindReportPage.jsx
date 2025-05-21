import React, { useState } from "react";
import ReportForm from "../components/indusindBankNormal/IndRegReportForm";
import CombinedReport from "../components/indusindBankNormal/CombinedReport";
import { PDFViewer } from "@react-pdf/renderer";

function IndusindReportPage() {
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

export default IndusindReportPage;
