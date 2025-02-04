import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Importing the Header
import apiCall from "../config/ApiConfig"; // Axios instance
import { AxiosError } from "../models/AxiosError";

const AddBook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState("");
  const [borrowed] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !author.trim() || !genre.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await apiCall.post(`/admin/books`, {
        title,
        author,
        genre,
        available,
        borrowed,
      });
      if (response.status === 200) {
        alert("Book Added SuccessFully");
        navigate("/home");
      }
    } catch (err) {
      const customError = err as AxiosError;
      if (customError.response) {
        alert("" + customError.response.data.detail);
        if (customError.response.data.detail === "Invalid token")
          navigate("/sessionExpired");
        else setError(customError.response.data.detail);
      }
      setError("Failed to add the book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />
      <h1 className="text-3xl font-bold mb-4 p-6">Add New Book</h1>

      {error && <div className="text-red-500 mb-4 ml-3">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-lg font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
            placeholder="Enter book title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
            placeholder="Enter author's name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Genre</label>
          <input
            type="text"
            value={genre}
            required
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-3 border rounded-md"
            placeholder="Enter genre"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={available}
              onChange={() => setAvailable(!available)}
              className="mr-2"
            />
            Available
          </label>
        </div>
        <button
          type="submit"
          className="w-full font-[Delius] bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Add Book
        </button>
      </form>
      <div className="w-9//10 flex justify-center items-center">
        <button
          onClick={() => navigate(-1)}
          className="w-fit font-[Delius] bg-yellow-600 hover:bg-yellow-700 text-white p-3 m-5   rounded-md"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
export default AddBook;
