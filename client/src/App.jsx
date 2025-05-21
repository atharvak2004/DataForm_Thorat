import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import IndusindReportPage from './pages/IndusindReportPage';
import IndusindTractorPage from './pages/IndusindTractorPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/indusind" element={<IndusindReportPage />} />
        <Route path="/indusindtractor" element={<IndusindTractorPage />} />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
