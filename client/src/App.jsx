import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import IndusindReportPage from './pages/IndusindReportPage';
import IndusindTractorPage from './pages/IndusindTractorPage';
import EquitasBankReportPage from './pages/EquitasBankReportPage'
import KotakBankReportPage from './pages/KotakBankReportPage'
import OtherBankReportPage from './pages/OtherBankReportPage';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/indusindbank" element={<IndusindReportPage />} />
        <Route path="/indusindtractor" element={<IndusindTractorPage />} />
        <Route path="/equitasbank" element={<EquitasBankReportPage />} />
        <Route path="/kotakbank" element={<KotakBankReportPage />} />
        <Route path="/otherbank" element={<OtherBankReportPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
