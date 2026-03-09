const express = require("express");
const router = express.Router();
const Book = require("../models/book");


// ================= GET ALL BOOKS =================
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching books",
      error: error.message,
    });
  }
});

// ================= ADD BOOK =================
router.post("/", async (req, res) => {
  try {
    const { title, author, isbn, category, quantity } = req.body;

    if (!title || !author || !isbn || !category || quantity == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: "ISBN already exists" });
    }

    const newBook = new Book({
      title,
      author,
      isbn,
      category,
      quantity,
      available: quantity, // set available initially
    });

    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Add book error:", error);
    res.status(500).json({
      message: "Error adding book",
      error: error.message,
    });
  }
});

// ================= UPDATE BOOK =================
router.put("/:id", async (req, res) => {
  try {
    const { title, author, isbn, category, quantity } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (quantity !== undefined) {
      const difference = quantity - book.quantity;

      if (book.available + difference < 0) {
        return res.status(400).json({
          message: "Cannot reduce quantity below issued books",
        });
      }

      book.available += difference;
      book.quantity = quantity;
    }

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.isbn = isbn ?? book.isbn;
    book.category = category ?? book.category;

    const updatedBook = await book.save();

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: "Error updating book",
      error: error.message,
    });
  }
});

// ================= DELETE BOOK =================
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.available !== book.quantity) {
      return res.status(400).json({
        message: "Cannot delete while copies are issued",
      });
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({
      message: "Error deleting book",
      error: error.message,
    });
  }
});

module.exports = router;