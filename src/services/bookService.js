import instance from "../api/axiosInstance";
import { handleError, handleResponse } from "../api/apiUtils";

const getAllBooks = async () => {
  try {
    const response = await instance.get("/books");
    const data = handleResponse(response);
    return data;
  } catch (error) {
    handleError(error);
  }
};

const getBookById = async (id) => {
  try {
    const response = await instance.get(`/books/${id}`);
    const data = handleResponse(response);
    return data?.book;
  } catch (error) {
    handleError(error);
  }
};

const addBook = async (bookData) => {
  try {
    const response = await instance.post("/books", bookData);
    const data = handleResponse(response);
    return data?.bookId;
  } catch (error) {
    handleError(error);
  }
};

const updateBook = async (id, bookData) => {
  try {
    const response = await instance.put(`/books/${id}`, bookData);
    handleResponse(response);
    return true;
  } catch (error) {
    handleError(error);
  }
};

const deleteBook = async (id) => {
  try {
    const response = await instance.delete(`/books/${id}`);
    handleResponse(response);
    return true;
  } catch (error) {
    handleError(error);
  }
};

export { getAllBooks, getBookById, addBook, updateBook, deleteBook };
