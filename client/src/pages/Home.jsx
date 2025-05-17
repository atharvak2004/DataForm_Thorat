import React, { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import CombinedReport from "../components/indusindBankNormal/CombinedReport";
import ReportForm from "../components/ReportForm";

function Home() {
  const [reportData, setReportData] = useState(null);

  const handleBack = () => setReportData(null); 

  return (
    <div>
      {!reportData ? (
        <ReportForm onSubmit={setReportData} />
      ) : (
        <>
          <button onClick={handleBack} style={{ margin: "10px", padding: "8px 16px" }}>
            ← Back
          </button>
          <PDFViewer width="100%" height="1000">
            <CombinedReport data={reportData} />
          </PDFViewer>
        </>
      )}
    </div>
  );
}

export default Home;
