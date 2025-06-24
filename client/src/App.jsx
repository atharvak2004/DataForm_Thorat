import { Routes, Route } from 'react-router-dom';
import { UserProvider } from "./components/UserContext";

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
import AdminDashboard from './pages/AdminDashboard';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';

import UserHome from './pages/Homes/UserHome';
import BankUserHome from './pages/Homes/BankUserHome';
import AdminHome from './pages/Homes/AdminHome';
import EmployeeHome from './pages/Homes/EmployeeHome';

import UserReportForm from './components/UserReportForm'
import BankUserReportForm from './components/BankUserReportForm'

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />

            <Route
              path="/indusindbank"
              element={
                <ProtectedRoute>
                  <IndusindReportPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/indusindtractor"
              element={
                <ProtectedRoute>
                  <IndusindTractorPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/equitasbank"
              element={
                <ProtectedRoute>
                  <EquitasBankReportPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/kotakbank"
              element={
                <ProtectedRoute>
                  <KotakBankReportPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/otherbank"
              element={
                <ProtectedRoute>
                  <OtherBankReportPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/report1/view/:vehicleNo"
              element={
                <ProtectedRoute>
                  <IndusindReportPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/home"
              element={
                <ProtectedRoute>
                  <UserHome />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bankuser/home"
              element={
                <ProtectedRoute>
                  <BankUserHome />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/home"
              element={
                <ProtectedRoute>
                  <AdminHome />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employee/home"
              element={
                <ProtectedRoute>
                  <EmployeeHome />
                </ProtectedRoute>
              }
            />

            <Route
              path="/userreportform"
              element={
                <ProtectedRoute>
                  <UserReportForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bankuserreportform"
              element={
                <ProtectedRoute>
                  <BankUserReportForm />
                </ProtectedRoute>
              }
            />

            {/* Admin Nested Routes under /admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route
                path="create-user"
                element={
                  <ProtectedRoute>
                    <AdminCreateUser />
                  </ProtectedRoute>
                }
              />
            </Route>

          </Routes>
        </main>

        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
