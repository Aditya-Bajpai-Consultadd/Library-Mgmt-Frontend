import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import BookItem from "../components/BookItem";
import apiCall from "../config/ApiConfig";
import BookResponse from "../models/Book";
import { useAuth } from "../context/AuthContext";
import { AxiosError } from "../models/AxiosError";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<"title" | "author" | "genre" | "">(
    ""
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterBook, setFilterBook] = useState<BookResponse[]>([]);
  const navigate = useNavigate();
  const { role, username } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      if (role === "Admin") {
        try {
          const response = await apiCall.get("/admin/books");
          setBooks(response.data);
          setFilterBook(response.data);
        } catch (err) {
          const customError = err as AxiosError;
          if (customError.response) {
            if (customError.response.data.detail === "No books found") {
              setBooks([]);
            } else {
              console.log("Session Expired");
              navigate("/sessionExpired");
            }
          }
        }
      } else if (role === "User") {
        try {
          const response = await apiCall.get("/user/books");
          setBooks(response.data);
          setFilterBook(response.data);
        } catch (err) {
          const customError = err as AxiosError;
          if (customError.response) {
            if (customError.response.data.detail === "No books found") {
              setBooks([]);
            } else {
              console.log("Session Expired");
              navigate("/sessionExpired");
            }
          }
        }
      }
    };
    fetchBooks();
  }, [navigate, role]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (!query) {
      setBooks(filterBook);
      return;
    }
    setBooks(
      filterBook.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query)
      )
    );
  };

  const handleSort = (field: "title" | "author" | "genre") => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);

    setBooks((prevBooks) => {
      return [...prevBooks].sort((a, b) => {
        if (a[field] < b[field]) return newOrder === "asc" ? -1 : 1;
        if (a[field] > b[field]) return newOrder === "asc" ? 1 : -1;
        return 0;
      });
    });
  };

  const getSortIcon = (field: "title" | "author" | "genre") => {
    if (sortField !== field) return "↕";
    return sortOrder === "asc" ? "⬆" : "⬇";
  };

  const handleAction = async (
    id: number,
    action: "update" | "delete" | "borrow"
  ) => {
    if (action === "delete") {
      try {
        await apiCall.delete(`/admin/books/${id}`);
        setBooks(books.filter((book) => book.id !== id));
        setFilterBook(books.filter((book) => book.id !== id));
        alert("Book Deleted Successfully");
      } catch (err) {
        const customError = err as AxiosError;
        if (customError.response) {
          alert(
            "Book with id: " +
              id +
              " not deleted. " +
              customError.response.data.detail
          );
          console.log(
            "Cannot Delete Book, Try again",
            +customError.response.data.detail
          );
        }
      }
    } else if (action === "update") {
      navigate(`/updateBook/${id}`);
    } else if (action === "borrow") {
      try {
        await apiCall.post(`/user/borrow/${id}`, { username, book_id: id });
        setBooks(
          books.map((book) =>
            book.id === id ? { ...book, available: false } : book
          )
        );
        alert("Book borrowed Successfully");
      } catch (err) {
        const customError = err as AxiosError;
        if (customError.response) {
          alert(customError.response.data.detail);
        }
      }
    } else {
      console.log(`Action: ${action} on book ID: ${id}`);
    }
  };

  if (role === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className=" mx-auto" style={{ width: "75%" }}>
        <div className="p-6">
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              style={{ borderRadius: "20px" }}
              onChange={handleSearch}
              placeholder="Search by title, author, or genre..."
              className="w-full p-3  border border-double border-black"
            />
          </div>
          {role === "User" && (
            <div className="mb-6">
              <button
                data-testid="Borrowed-btn"
                onClick={() => navigate("/user/borrowedBooks")}
                className="relative  rounded px-5 py-2.5 overflow-hidden group bg-blue-400  hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-300 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-300 transition-all ease-out duration-200"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">View Borrowed Books</span>
              </button>
            </div>
          )}
          {role === "Admin" && (
            <div className="mb-6">
              <button
                onClick={() => navigate("/addBook")}
                className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500  hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-200"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative font-[Delius]">Add Book</span>
              </button>
              <button
                onClick={() => navigate("/admin/borrowedBooks")}
                className="relative ml-4 rounded px-5 py-2.5 overflow-hidden group bg-blue-400  hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-300 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-300 transition-all ease-out duration-200"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative font-[Delius]">
                  View Borrowed Books
                </span>
              </button>
            </div>
          )}

          <div className="bg-white max-w-full w-full shadow-md rounded-lg overflow-x-auto">
            <table className="w-full min-w-max border-collapse">
              <thead className="bg-[#264653] text-white">
                <tr>
                  <th className="px-4 py-2 text-left">
                    <button
                      onClick={() => handleSort("title")}
                      className="flex items-center space-x-2"
                    >
                      <span>Title</span> <span>{getSortIcon("title")}</span>
                    </button>
                  </th>
                  <th className="px-4 py-2 text-left">
                    <button
                      onClick={() => handleSort("author")}
                      className="flex items-center space-x-2"
                    >
                      <span>Author</span> <span>{getSortIcon("author")}</span>
                    </button>
                  </th>
                  <th className="px-4 py-2 text-left">
                    <button
                      onClick={() => handleSort("genre")}
                      className="flex items-center space-x-2"
                    >
                      <span>Genre</span> <span>{getSortIcon("genre")}</span>
                    </button>
                  </th>
                  <th className="px-4 py-2 text-center">Available</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book) => (
                    <BookItem
                      key={book.id}
                      book={book}
                      role={role}
                      onAction={handleAction}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-4 text-center text-gray-600"
                    >
                      No books found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
