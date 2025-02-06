import { useState, useEffect } from "react";
import apiCall from "../config/ApiConfig";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { BorrowedBookAdmin } from "../models/BorrowedBook";

const AdminBorrowedBooks = () => {
  const [books, setBooks] = useState<BorrowedBookAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllBorrowedBooks = async () => {
      try {
        const response = await apiCall.get("/admin/borrowedBooksAll");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching all borrowed books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBorrowedBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">All Borrowed Books</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-600">
            No books have been borrowed.
          </p>
        ) : (
          <div className="bg-white w-full max-w-full shadow-md rounded-lg overflow-x-auto">
            <table className="w-full min-w-max border-collapse">
              <thead className="bg-[#264653] text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Book ID</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Author</th>
                  <th className="px-4 py-2 text-left">Genre</th>
                  <th className="px-4 py-2 text-center">Borrowed By</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{book.id}</td>
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    <td className="px-4 py-2">{book.genre}</td>
                    <td className="px-4 py-2 text-center font-semibold text-blue-600">
                      {book.borrowedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-fit font-[Delius] bg-yellow-600 hover:bg-yellow-700 text-white p-3 m-5 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminBorrowedBooks;
