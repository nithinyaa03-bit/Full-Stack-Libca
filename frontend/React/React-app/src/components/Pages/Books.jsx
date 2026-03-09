import React, { useState } from "react";
import { useApp } from "../store.jsx";

const Books = () => {
  const { books, addBook, updateBook, deleteBook } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    quantity: 1,
  });

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingBook) {
        await updateBook(editingBook._id, formData);
      } else {
        await addBook(formData);
      }

      resetForm();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  // ================= HANDLE EDIT =================
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      quantity: book.quantity,
    });
    setShowModal(true);
  };

  // ================= HANDLE DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(id);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ================= RESET FORM =================
  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      isbn: "",
      category: "",
      quantity: 1,
    });
    setEditingBook(null);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Books Management
          </h1>
          <p className="text-gray-500">
            Manage your library's collection.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition"
        >
          Add New Book
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Title / Author
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                ISBN
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Qty
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Avail
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {books.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No books available
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">
                      {book.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {book.author}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {book.isbn}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                      {book.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center text-sm font-medium">
                    {book.quantity}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`text-sm font-bold ${
                        book.available > 0
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {book.available}
                    </span>
                  </td>

                  {/* ===== Updated Action Buttons ===== */}
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 bg-amber-600 text-white flex justify-between items-center rounded-t-2xl">
              <h3 className="text-xl font-bold">
                {editingBook ? "Edit Book" : "Add New Book"}
              </h3>
              <button onClick={resetForm}>✖</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input
                required
                placeholder="Book Title"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                required
                placeholder="Author"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  placeholder="ISBN"
                  className="px-3 py-2 border rounded-lg"
                  value={formData.isbn}
                  onChange={(e) =>
                    setFormData({ ...formData, isbn: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="Category"
                  className="px-3 py-2 border rounded-lg"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>

              <input
                type="number"
                min="1"
                required
                placeholder="Quantity"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value),
                  })
                }
              />

              <button
                type="submit"
                className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl hover:bg-amber-700 transition"
              >
                {editingBook ? "Update Book" : "Save Book"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;