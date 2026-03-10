const router = require("express").Router();
const Issue = require("../models/issue");
const Book = require("../models/book");

/* ================= GET ALL ISSUES ================= */

router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("student")
      .populate("teacher")
      .populate("book");

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= ISSUE A BOOK ================= */

router.post("/", async (req, res) => {
  try {
    const { student, teacher, book, dueDate } = req.body;

    // borrower validation
    if (!student && !teacher) {
      return res.status(400).json({
        message: "Student or Teacher must be selected",
      });
    }

    // Check book availability
    const selectedBook = await Book.findById(book);

    if (!selectedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (selectedBook.quantity <= 0) {
      return res.status(400).json({ message: "Book out of stock" });
    }

    // Create issue record
    const newIssue = new Issue({
      student: student || null,
      teacher: teacher || null,
      book,
      dueDate,
    });

    await newIssue.save();

    // Reduce book quantity
    selectedBook.quantity -= 1;
    await selectedBook.save();

    res.status(201).json(newIssue);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= RETURN BOOK ================= */

router.put("/return/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue record not found" });
    }

    if (issue.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }

    issue.status = "returned";
    issue.returnDate = new Date();

    await issue.save();

    // Increase book quantity
    await Book.findByIdAndUpdate(issue.book, {
      $inc: { quantity: 1 },
    });

    res.json({ message: "Book returned successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= DELETE ISSUE ================= */

router.delete("/:id", async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json({ message: "Issue deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;