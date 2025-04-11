import React, { useState, useEffect } from "react";
import FormField from "./FormField";

const BookFormModal = ({ error, isOpen, onClose, onSubmit, initialBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    author: "",
    summary: "",
    publisher: "",
    pageCount: "",
    readPage: "",
  });

  useEffect(() => {
    if (initialBook) {
      setFormData({
        title: initialBook.title || "",
        year: String(initialBook.year) || "",
        author: initialBook.author || "",
        summary: initialBook.summary || "",
        publisher: initialBook.publisher || "",
        pageCount: String(initialBook.pageCount) || "",
        readPage: String(initialBook.readPage) || "",
      });
    } else {
      setFormData({
        title: "",
        year: "",
        author: "",
        summary: "",
        publisher: "",
        pageCount: "",
        readPage: "",
      });
    }
  }, [initialBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      ...formData,
      year: parseInt(formData.year) || 0,
      pageCount: parseInt(formData.pageCount) || 0,
      readPage: parseInt(formData.readPage) || 0,
    };
    if (initialBook?.id) {
      bookData.id = initialBook.id;
    }
    onSubmit(bookData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-700"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-6">
          {initialBook?.id ? "Edit" : "Add New"} Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required={true}
          />
          <FormField
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required={true}
          />
          <FormField
            label="Author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            required={true}
          />
          <FormField
            label="Publisher"
            name="publisher"
            type="text"
            value={formData.publisher}
            onChange={handleChange}
            required={true}
          />
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Summary:
            </label>
            <textarea
              name="summary"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Page Count"
              name="pageCount"
              type="number"
              value={formData.pageCount}
              onChange={handleChange}
              required={true}
            />
            <FormField
              label="Read Page"
              name="readPage"
              type="number"
              value={formData.readPage}
              onChange={handleChange}
              required={true}
            />
          </div>
          {error && (
            <div
              className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-2"
              role="alert"
            >
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              }
            >
              {initialBook?.id ? "Update" : "Add"} Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
