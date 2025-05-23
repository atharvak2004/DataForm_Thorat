import React from 'react';
import { Document } from '@react-pdf/renderer';
import EquitasBankPage1 from './EquitasBankPage1';
import EquitasBankPage2 from './EquitasBankPage2';
import EquitasBankPage3 from './EquitasBankPage3';
import EquitasBankPage4 from './EquitasBankPage4';
import EquitasBankPage5 from './EquitasBankPage5';

const CombinedReport = ({ data }) => (
  <Document>
    <EquitasBankPage1 data={data} />
    <EquitasBankPage2 data={data} />
    <EquitasBankPage3 data={data} />
    <EquitasBankPage4 data={data} />
    <EquitasBankPage5 data={data} />
  </Document>
);


export default CombinedReport;