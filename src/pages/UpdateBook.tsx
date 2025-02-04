import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import apiCall from "../config/ApiConfig";
import { AxiosError } from "../models/AxiosError";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [available, setAvailable] = useState(true);
  const [borrowed, setBorrowed] = useState<number>(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (id) {
          const response = await apiCall.get(`/admin/books/${parseInt(id)}`);
          const bookData = response.data;
          setTitle(bookData.title);
          setAuthor(bookData.author);
          setGenre(bookData.genre);
          setAvailable(bookData.available);
          setBorrowed(bookData.borrowed);
        }
      } catch (err) {
        const customError = err as AxiosError;
        if (customError.response) {
          if (customError.response.data.detail === "Invalid token")
            navigate("/sessionExpired");
          else if (customError.response.data.detail === "Not authorized")
            navigate("/unauthorized");
          else setError(customError.response.data.detail);
        }
      }
    };
    fetchBookDetails();
  }, [id, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !author.trim() || !genre.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      await apiCall.put(`/admin/books/${id}`, {
        title,
        author,
        genre,
        available,
      });
      alert("Book Updated Successfully");
      navigate(-1);
    } catch (err) {
      const customError = err as AxiosError;
      if (customError.response) {
        setError(customError.response.data.detail);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <h1 className="text-3xl font-bold mb-4 p-6">Update Book</h1>
      {error && <div className="text-red-500 mb-4 ml-3">{error}</div>}
      <form
        onSubmit={handleUpdate}
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
            required
            value={genre}
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
              disabled={borrowed === 1}
              className="mr-2"
            />
            Available
          </label>
          {borrowed === 1 && (
            <p className="text-red-500 text-sm">Book is borrowed</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full font-[Delius] bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
        >
          Update Book
        </button>
      </form>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={() => navigate(-1)}
          className="w-fit font-[Delius] bg-yellow-600 hover:bg-yellow-700 text-white p-3 m-5 rounded-md"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
