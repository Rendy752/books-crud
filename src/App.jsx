import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/" element={<BookList />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
