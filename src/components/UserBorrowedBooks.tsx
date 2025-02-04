import { useState, useEffect } from "react";
import apiCall from "../config/ApiConfig";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { BorrowedBookUser } from "../models/BorrowedBook";

const UserBorrowedBooks = () => {
  const [books, setBooks] = useState<BorrowedBookUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBorrowedBooks = async () => {
      try {
        const response = await apiCall.get(`/user/borrowedBooks/${username}`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching user borrowed books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserBorrowedBooks();
  }, [username]);

  const handlegoBack = () => {
    navigate(-1);
  };

  const handleReturnBook = async (bookId: number) => {
    try {
      await apiCall.post(`/user/return/${bookId}`, {
        username,
        book_id: bookId,
      });
      setBooks(books.filter((book) => book.id !== bookId));
      alert("Book returned Successfully");
    } catch (err) {
      console.error("Error returning book:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Your Borrowed Books</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-600">
            You have not borrowed any books.
          </p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-[#264653] text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Book ID</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Author</th>
                  <th className="px-4 py-2 text-left">Genre</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{book.id}</td>
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    <td className="px-4 py-2">{book.genre}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleReturnBook(book.id)}
                        className="relative  rounded px-5 py-2.5 overflow-hidden group bg-red-400  hover:bg-gradient-to-r hover:from-red-400 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-300 transition-all ease-out duration-200"
                      >
                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span className="relative font-[Delius]">Return</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="w-full flex justify-center items-center">
          <button
            onClick={handlegoBack}
            className="w-fit font-[Delius] bg-yellow-600 hover:bg-yellow-700 text-white p-3 m-5 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserBorrowedBooks;
