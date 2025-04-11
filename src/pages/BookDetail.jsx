import React from "react";
import { useParams, Link } from "react-router-dom";
import useBookDetail from "../hooks/useBookDetail";
import BookFormModal from "../components/BookFormModal";
import BookDetailItem from "../components/BookDetailItem"; // Import the new component

const BookDetail = () => {
  const {
    book,
    error,
    loading,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleUpdateBook,
  } = useBookDetail(useParams().id);

  if (loading) {
    return <div className="p-6">Loading book details...</div>;
  }

  if (!book) {
    return <div className="p-6">Book not found.</div>;
  }

  const bookDetailsData = [
    { label: "Author", value: book.author },
    { label: "Year", value: book.year },
    { label: "Publisher", value: book.publisher },
    { label: "Summary", value: book.summary },
    { label: "Page Count", value: book.pageCount },
    { label: "Read Page", value: book.readPage },
    { label: "Finished", value: book.isFinished ? "Yes" : "No" },
  ];

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-md p-6">
        <p className="text-3xl font-bold mb-6">{book.title}</p>
        {bookDetailsData.map((item, index) => (
          <BookDetailItem
            key={index}
            label={item.label}
            value={item.value}
            className={item.className}
          />
        ))}
        <div className="mt-6 flex justify-end">
          <button
            onClick={openEditModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Book
          </button>
        </div>
      </div>

      <BookFormModal
        loading={loading}
        error={error}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleUpdateBook}
        initialBook={book}
      />
    </div>
  );
};

export default BookDetail;
