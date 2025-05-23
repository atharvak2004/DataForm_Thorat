import React from 'react';
import { Document } from '@react-pdf/renderer';
import KotakBankPage1 from './KotakBankPage1';
import KotakBankPage2 from './KotakBankPage2';
import KotakBankPage3 from './KotakBankPage3';
import KotakBankPage4 from './KotakBankPage4';
import KotakBankPage5 from './KotakBankPage5';

const CombinedReport = ({ data }) => (
  <Document>
    <KotakBankPage1 data={data} />
    <KotakBankPage2 data={data} />
    <KotakBankPage3 data={data} />
    <KotakBankPage4 data={data} />
    <KotakBankPage5 data={data} />
  </Document>
);


export default CombinedReport;