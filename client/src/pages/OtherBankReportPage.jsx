import React, { useState } from "react";
import ReportForm from "../components/OtherBanks/OtherBanksReportForm";
import CombinedReport from "../components/OtherBanks/CombinedReport";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { isMobile } from "react-device-detect";

function OtherBanksReportPage() {
  const [reportData, setReportData] = useState(null);

  return (
    <div>
      {!reportData ? (
        <ReportForm onSubmit={setReportData} />
      ) : (
        <div style={{ padding: "20px", textAlign: "center" }}>
          {isMobile ? (
            <>
              <p style={{ marginBottom: "1rem" }}>
                PDF preview is not supported on mobile. Please download the report below.
              </p>
              <PDFDownloadLink
                document={<CombinedReport data={reportData} />}
                fileName="OtherBanks_Report.pdf"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}
              >
                {({ loading }) =>
                  loading ? "Preparing document..." : "Download Report"
                }
              </PDFDownloadLink>
            </>
          ) : (
            <PDFViewer width="100%" height="1000">
              <CombinedReport data={reportData} />
            </PDFViewer>
          )}
        </div>
      )}
    </div>
  );
}

export default OtherBanksReportPage;
