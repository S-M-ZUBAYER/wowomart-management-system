import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/custom/Navbar";
import Sidebar from "./components/custom/Sidebar";

import Home from "./components/custom/Home";
import { Create } from "./components/custom/Create";
import { Pending } from "./components/custom/Pending";
import { Disable } from "./components/custom/Disable";
import SellerDetailsView from "./components/custom/SellerDetailsView";
import UpdateSellerInfo from "./components/custom/UpdateSellerInfo";
import DiscountPage from "./components/discount/DiscountPage";
import { DiscountTable } from "./components/discount/DiscountTable";
import DiscountDetails from "./components/discount/DiscountDetails";
import { CouponUserList } from "./components/custom/Coupon-user-list";
import CouponUserDetails from "./components/custom/Coupon-user-details";
import AssignTag from "./components/custom/Assign-Tag";
import Signin from "./components/auth/sign-in";
import Signup from "./components/auth/sign-up";
import FourZeroFour from "./components/custom/404";
import PercentPage from "./components/discount/PercentPage";
import { useEffect, useState } from "react";

const Layout = ({ children }) => (
  <div className="w-screen h-screen flex flex-col">
    <Navbar />

    <div className="flex flex-1 overflow-hidden flex-col xl:flex-row">
      <aside className="w-full xl:w-[15%] ">
        <Sidebar />
      </aside>
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/log-in" replace />;
};
const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.admin) {
      setShowModal(true);
    }
  }, [user]);

  const handleClose = () => {
    setShowModal(false);
    navigate("/log-in");
  };

  if (!user?.admin) {
    return (
      <>
        {showModal && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md bg-white border border-gray-300 shadow-2xl rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-700 mb-6 font-semibold">
              Only Admin can create a new account.
            </p>
            <div className="flex justify-center hover:cursor-pointer">
              <button
                onClick={handleClose}
                className="px-4 py-2 font-semibold"
                style={{ backgroundColor: "#004368", color: "white" }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return children;
};
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/log-in" element={<Signin />} />
          {/* <Route path="/sign-up" element={<Signup />} /> */}
          <Route
            path="/sign-up"
            element={
              <ProtectedAdminRoute>
                <Signup />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/created"
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending"
            element={
              <ProtectedRoute>
                <Pending />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disabled"
            element={
              <ProtectedRoute>
                <Disable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller-details"
            element={
              <ProtectedRoute>
                <SellerDetailsView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-seller"
            element={
              <ProtectedRoute>
                <UpdateSellerInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discount"
            element={
              <ProtectedRoute>
                <DiscountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discount-table"
            element={
              <ProtectedRoute>
                <DiscountTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discount-details"
            element={
              <ProtectedRoute>
                <DiscountDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coupon-user-list"
            element={
              <ProtectedRoute>
                <CouponUserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coupon-user-details"
            element={
              <ProtectedRoute>
                <CouponUserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assign-tag"
            element={
              <ProtectedRoute>
                <AssignTag />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-percent"
            element={
              <ProtectedRoute>
                <PercentPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<FourZeroFour />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
