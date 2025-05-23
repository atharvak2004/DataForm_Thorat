import React, { useState } from "react";
import ReportForm from "../components/OtherBanks/OtherBanksReportForm";
import CombinedReport from "../components/OtherBanks/CombinedReport";
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
