/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/auth/login.jsx';
import Logout from './pages/auth/logout.jsx';
import SignupPage from './pages/auth/signup.jsx';
import UserDetails from './pages/user-details.jsx';
import Layout from './layout/index.jsx';
import HomePage from './pages/index.jsx';
import CleaningRequests from './pages/cleaning-requests.jsx';
import CleaningDetail from './pages/cleaning-detail.jsx';
import UserManagement from './pages/user-management-updated.jsx';
import CleanerApplications from './pages/cleaner-application.jsx';
import Services from './pages/services.jsx';
import ServiceCategory from './pages/service-category.jsx';
import Scheduling from './pages/scheduling.jsx';
import CustomerSupport from './pages/customer-support.jsx';
import AccountManagement from './pages/account-management.jsx';
import AdditionalRoles from './pages/additional-roles.jsx';
import ScheduleManager from './pages/cleaning-frequency.jsx';
import ContentManagement from './pages/content-management.jsx';
import PaymentHistory from './pages/payment-history.jsx';
import ProtectedRoute from './components/ui/ProtectedRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/logout" element={<Logout />} />

        {/* Protected Routes (inside layout) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/auth/users/:id" element={<UserDetails />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/cleaner-application" element={<CleanerApplications />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-category" element={<ServiceCategory />} />
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="/transactions" element={<PaymentHistory />} />
          <Route path="/cleaning-requests" element={<CleaningRequests />} />
          <Route path="/cleaning-detail/:id" element={<CleaningDetail />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          {/* <Route path="*" element={<Navigate to="/cleaning-requests" replace />} /> */}
          <Route path="/account-management" element={<AccountManagement />} />
          <Route path="/additional-roles" element={<AdditionalRoles />} />
          <Route path="/cleaning-frequency" element={<ScheduleManager />} />
          <Route path="/content-management" element={<ContentManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
