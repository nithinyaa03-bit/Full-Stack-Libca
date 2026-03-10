const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    /* ================= BORROWER ================= */

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null
    },

    /* ================= BOOK ================= */

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },

    /* ================= DATES ================= */

    issueDate: {
      type: Date,
      default: Date.now
    },

    dueDate: {
      type: Date,
      required: true
    },

    returnDate: {
      type: Date,
      default: null
    },

    /* ================= STATUS ================= */

    status: {
      type: String,
      enum: ["issued", "returned", "overdue"],
      default: "issued"
    },

    /* ================= EMAIL FLAGS ================= */

    // prevent duplicate reminder emails
    reminderSent: {
      type: Boolean,
      default: false
    },

    // prevent duplicate overdue emails
    overdueEmailSent: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
