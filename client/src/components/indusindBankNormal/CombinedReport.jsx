// CombinedReport.jsx
import { Document } from '@react-pdf/renderer';
import IndRegPage1 from './IndRegPage1';
import IndRegPage2 from './IndRegPage2';
import IndRegPage3 from './IndRegPage3';
import IndRegPage4 from './IndRegPage4';
import IndRegPage5 from './IndRegPage5';

const CombinedReport = ({ data }) => (
  <Document>
    <IndRegPage1 data={data} />
    <IndRegPage2 data={data} />
    <IndRegPage3 data={data} />
    <IndRegPage4 data={data} />
    <IndRegPage5 data={data} />
  </Document>
);


export default CombinedReport;