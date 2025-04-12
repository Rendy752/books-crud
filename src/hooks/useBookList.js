import { useState, useEffect } from "react";
import { getAllBooks, deleteBook, addBook } from "../services/bookService";
import { toast } from "react-toastify";

const useBookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [bookToDeleteId, setBookToDeleteId] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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

  const setDeleteConfirmationDialog = (id) => {
    id && setBookToDeleteId(id);
    setDeleteConfirmationOpen(id != null);
  };

  const confirmDelete = async () => {
    if (bookToDeleteId) {
      try {
        await deleteBook(bookToDeleteId);
        await fetchBooks();
        setError(null);
        toast.success("Book deleted successfully!");
        setDeleteConfirmationDialog();
      } catch (err) {
        setError(err.message);
        toast.error(`Error deleting book: ${err.message}`);
      }
    }
  };

  const setAddDialog = (open) => {
    setIsAddDialogOpen(open);
  };

  const handleAddBook = async (newBookData) => {
    try {
      await addBook(newBookData);
      await fetchBooks();
      setError(null);
      toast.success("Book added successfully!");
      setAddDialog(false);
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
    isAddDialogOpen,
    setDeleteConfirmationDialog,
    confirmDelete,
    setAddDialog,
    handleAddBook,
  };
};

export default useBookList;
