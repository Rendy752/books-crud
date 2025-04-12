import React from "react";
import useBookList from "../hooks/useBookList";
import ConfirmationDialog from "../components/ConfirmationDialog";
import BookFormModal from "../components/BookFormModal";
import BookListItem from "../components/BookListItem";

const BookList = () => {
  const {
    books,
    loading,
    error,
    deleteConfirmationOpen,
    isAddDialogOpen,
    setDeleteConfirmationDialog,
    confirmDelete,
    setAddDialog,
    handleAddBook,
  } = useBookList();

  if (loading) {
    return <div className="p-6">Loading books...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Book Library</h1>
        <button
          onClick={() => setAddDialog(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline"
        >
          Add New Book
        </button>
      </div>
      {books && books.length > 0 ? (
        <ul className="space-y-3">
          {books.map((book) => (
            <BookListItem
              key={book.id}
              book={book}
              onDelete={setDeleteConfirmationDialog}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 italic">
          No books available in your library.
        </p>
      )}

      <ConfirmationDialog
        isOpen={deleteConfirmationOpen}
        message="Are you sure you want to delete this book?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmationDialog()}
      />

      <BookFormModal
        loading={loading}
        error={error}
        isOpen={isAddDialogOpen}
        onClose={() => setAddDialog(false)}
        onSubmit={handleAddBook}
      />
    </div>
  );
};

export default BookList;
