// CombinedReport.jsx
import { Document } from '@react-pdf/renderer';
import IndTractorPage1 from './IndTractorPage1.jsx';
import IndTractorPage2 from './IndTractorPage2.jsx';
import IndTractorPage3 from './IndTractorPage3.jsx';
import IndTractorPage4 from './IndTractorPage4.jsx';
import IndTractorPage5 from './IndTractorPage5.jsx';

const CombinedReport = ({ data }) => (
  <Document>
    <IndTractorPage1 data={data} />
    <IndTractorPage2 data={data} />
    <IndTractorPage3 data={data} />
    <IndTractorPage4 data={data} />
    <IndTractorPage5 data={data} />
  </Document>
);


export default CombinedReport;