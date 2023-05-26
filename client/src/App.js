import { Suspense, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";

import AppShell from "./AppShell";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Login from "./components/formComponent/Login";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import Employee from "./components/formComponent/Employee";
import Student from "./components/formComponent/Student";
import Dependent from "./components/formComponent/Dependent";
import Insurance from "./components/formComponent/Insurance";
import ViewInsurance from "./components/formComponent/ViewInsurance"
import View_Dep from "./components/View-Dep";
import AdminDashboard from "./components/AdminDashboard";
import Medical from "./components/formComponent/Medical";
import DLogin from "./components/DLogin";
import DoctorDashboard from "./components/DoctorDashboard";
import DoctorDashboard_T from "./components/DoctorDashboard_T";

const LoadingFallback = () => (
  <AppShell>
    <div className="p-4">Loading...</div>
  </AppShell>
);

const EmployeeRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  return auth.isAuthenticated() && auth.isEmployee() ? (
    <AppShell>{children}</AppShell>
  ) : (
    <Navigate to="/" />
  );
};

const StudentRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  return auth.isAuthenticated() && auth.isStudent() ? (
    <AppShell>{children}</AppShell>
  ) : (
    <Navigate to="/" />
  );
};

const AdminRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  return auth.isAuthenticated() && auth.isAdmin() ? (
    <AppShell>{children}</AppShell>
  ) : (
    <Navigate to="/" />
  );
};

const DoctorRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  return auth.isAuthenticated() && auth.isDoctor() ? (
    <AppShell>{children}</AppShell>
  ) : (
    <Navigate to="/" />
  );
};

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/employee"
            element={
              <>
                <Header />
                <Employee />
                <Footer />
              </>
            }
          />
          <Route
            path="/student"
            element={
              <>
                <Header />
                <Student />
                <Footer />
              </>
            }
          />
          <Route
            path="/dashboard/e"
            element={
              <EmployeeRoute>
                <Dashboard />
              </EmployeeRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <StudentRoute>
                <Dashboard />
              </StudentRoute>
            }
          />
          <Route
            path="/dashboard/e/add-dependent"
            element={
              <EmployeeRoute>
                <Dependent />
              </EmployeeRoute>
            }
          />
          <Route
            path="/dashboard/add-dependent"
            element={
              <StudentRoute>
                <Dependent />
              </StudentRoute>
            }
          />
          <Route
            path="/dashboard/e/get-all"
            element={
              <EmployeeRoute>
                <View_Dep />
              </EmployeeRoute>
            }
          />
          <Route
            path="/dashboard/get-all"
            element={
              <StudentRoute>
                <View_Dep />
              </StudentRoute>
            }
          />
          <Route
            path="/dashboard/e/insurance"
            element={
              <EmployeeRoute>
                <Insurance />
              </EmployeeRoute>
            }
          />
          <Route
            path="/dashboard/insurance"
            element={
              <StudentRoute>
                <Insurance />
              </StudentRoute>
            }
          />
          <Route
            path="/dashboard/e/view-insurance"
            element={
              <EmployeeRoute>
                <ViewInsurance />
              </EmployeeRoute>
            }
          />
          <Route
            path="/dashboard/view-insurance"
            element={
              <StudentRoute>
                <ViewInsurance />
              </StudentRoute>
            }
          />
          <Route
            path="/dashboard/e/view-medical"
            element={
              <EmployeeRoute>
                <Insurance />
              </EmployeeRoute>
            }
          />
          <Route
            path="/dashboard/view-medical"
            element={
              <StudentRoute>
                <Insurance />
              </StudentRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <>
              <Header />
              <Admin />
                <Footer />
              </>
            }
          />
          <Route
            path="/admin/add-data"
            element={
              <>
               <AdminRoute>
                <AdminDashboard />
                </AdminRoute>
              </>
            }
          />

          <Route
            path="/doctor"
            element={
              <>
                <Header />
                <DLogin />
                <Footer />
              </>
            }
          />
          <Route
            path="/doctor/add-records"
            element={
              <>
               <DoctorRoute>
                <DoctorDashboard/>
                </DoctorRoute>
              </>
            }
          />

          <Route
            path="/doctor/view-records"
            element={
              <>
               <DoctorRoute>
                <DoctorDashboard_T/>
                </DoctorRoute>
              </>
            }
          />
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <FetchProvider>
        <div>
          <AppRoutes />
        </div>
      </FetchProvider>
    </AuthProvider>
  );
}

export default App;
