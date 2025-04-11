import { useState, useEffect } from "react";
import { getAllBooks, deleteBook, addBook } from "../services/bookService";
import { toast } from "react-toastify";

const useBookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [bookToDeleteId, setBookToDeleteId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(`Error loading books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const openDeleteConfirmation = (id) => {
    setBookToDeleteId(id);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setBookToDeleteId(null);
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = async () => {
    if (bookToDeleteId) {
      try {
        await deleteBook(bookToDeleteId);
        await fetchBooks();
        setError(null);
        toast.success("Book deleted successfully!");
        closeDeleteConfirmation();
      } catch (err) {
        setError(err.message);
        toast.error(`Error deleting book: ${err.message}`);
      }
    }
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddBook = async (newBookData) => {
    try {
      await addBook({
        ...newBookData,
        readPage: newBookData.readPage || 0,
      });
      await fetchBooks();
      setError(null);
      toast.success("Book added successfully!");
      closeAddModal();
      return true;
    } catch (err) {
      setError(err.message);
      toast.error(`Error adding book: ${err.message}`);
      return false;
    }
  };

  return {
    books,
    loading,
    error,
    deleteConfirmationOpen,
    isAddModalOpen,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    confirmDelete,
    openAddModal,
    closeAddModal,
    handleAddBook,
  };
};

export default useBookList;
