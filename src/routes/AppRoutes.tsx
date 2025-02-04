import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UnAuthorized from "../pages/UnAuthorized";
import ProtectedRoute from "../components/ProtectedRoutes";
import SessionExpired from "../pages/SessionExpired";
import AddBook from "../pages/AddBook";
import UpdateBook from "../pages/UpdateBook";
import UserBorrowedBooks from "../components/UserBorrowedBooks";
import AdminBorrowedBooks from "../components/AdminBorrowedBooks";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addBook"
        element={
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updateBook/:id"
        element={
          <ProtectedRoute>
            <UpdateBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/borrowedBooks"
        element={
          <ProtectedRoute>
            <UserBorrowedBooks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/borrowedBooks"
        element={
          <ProtectedRoute>
            <AdminBorrowedBooks />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="/sessionExpired" element={<SessionExpired />} />
    </Routes>
  );
};

export default AppRoutes;
