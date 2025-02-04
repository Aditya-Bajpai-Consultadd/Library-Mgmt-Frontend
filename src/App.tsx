import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import UnAuthorized from "./components/UnAuthorized";
import ProtectedRoute from "./components/ProtectedRoutes";
import SessionExpired from "./components/SessionExpired";
import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import UserBorrowedBooks from "./components/UserBorrowedBooks";
import AdminBorrowedBooks from "./components/AdminBorrowedBooks";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" index element={<LandingPage />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sessionExpired" element={<SessionExpired />} />
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
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
