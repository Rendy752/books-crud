import { useState, useEffect } from "react";
import { getBookById, updateBook } from "../services/bookService";
import { toast } from "react-toastify";

const useBookDetail = (bookId) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchBook = async () => {
    setLoading(true);
    setBook(null);
    try {
      const data = await getBookById(bookId);
      setBook(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(`Error loading book: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchBook();
    }
  }, []);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateBook = async (updatedBookData) => {
    if (bookId) {
      try {
        await updateBook(bookId, updatedBookData);
        await fetchBook();
        setError(null);
        toast.success("Book updated successfully!");
        closeEditModal();
        return true;
      } catch (err) {
        setError(err.message);
        toast.error(`Error updating book: ${err.message}`);
        return false;
      }
    }
    return false;
  };

  return {
    book,
    error,
    loading,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleUpdateBook,
  };
};

export default useBookDetail;
