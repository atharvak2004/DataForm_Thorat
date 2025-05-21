import React, { useState } from "react";
import ReportForm from "../components/indusindBankTractor/IndTractorReportForm";
import CombinedReport from "../components/indusindBankTractor/CombinedReport";
import { PDFViewer } from "@react-pdf/renderer";

function IndusindTractorPage() {
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

export default IndusindTractorPage;
