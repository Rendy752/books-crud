import React from "react";
import { useNavigate } from "react-router-dom";

const BookListItem = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <li
      key={book.id}
      className="bg-white shadow-md rounded-md p-4 flex gap-4 items-center justify-between cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleItemClick}
    >
      <div>
        <h2 className="text-lg font-semibold text-blue-500 hover:underline">
          {book.title}
        </h2>
        <p className="text-gray-600">
          {book.author} ({book.year})
        </p>
        <p className="text-sm text-gray-500">
          {book.isFinished ? "Finished" : "Reading"}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(book.id);
        }}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Delete
      </button>
    </li>
  );
};

export default BookListItem;
