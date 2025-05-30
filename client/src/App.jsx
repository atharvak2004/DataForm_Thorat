import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './pages/Profile';

import IndusindReportPage from './pages/IndusindReportPage';
import IndusindTractorPage from './pages/IndusindTractorPage';
import EquitasBankReportPage from './pages/EquitasBankReportPage';
import KotakBankReportPage from './pages/KotakBankReportPage';
import OtherBankReportPage from './pages/OtherBankReportPage';
import History from './pages/History';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminCreateUser from "./pages/AdminCreateUser";
import ChangePassword from "./pages/ChangePassword";



function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute><About /></ProtectedRoute>
          } />
          <Route path="/indusindbank" element={
            <ProtectedRoute><IndusindReportPage /></ProtectedRoute>
          } />
          <Route path="/indusindtractor" element={
            <ProtectedRoute><IndusindTractorPage /></ProtectedRoute>
          } />
          <Route path="/equitasbank" element={
            <ProtectedRoute><EquitasBankReportPage /></ProtectedRoute>
          } />
          <Route path="/kotakbank" element={
            <ProtectedRoute><KotakBankReportPage /></ProtectedRoute>
          } />
          <Route path="/otherbank" element={
            <ProtectedRoute><OtherBankReportPage /></ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute><History /></ProtectedRoute>
          } />
          <Route
            path="/admin/create-user"
            element={
              <ProtectedRoute>
                <AdminCreateUser />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
