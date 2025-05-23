import React from 'react';
import { Document } from '@react-pdf/renderer';
import OtherBanksPage1 from './OtherBanksPage1';
import OtherBanksPage2 from './OtherBanksPage2';
import OtherBanksPage3 from './OtherBanksPage3';
import OtherBanksPage4 from './OtherBanksPage4';
import OtherBanksPage5 from './OtherBanksPage5';

const CombinedReport = ({ data }) => (
  <Document>
    <OtherBanksPage1 data={data} />
    <OtherBanksPage2 data={data} />
    <OtherBanksPage3 data={data} />
    <OtherBanksPage4 data={data} />
    <OtherBanksPage5 data={data} />
  </Document>
);


export default CombinedReport;