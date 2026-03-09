const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["issued", "returned", "overdue"],
      default: "issued",
    },

    returnDate: {
      type: Date,
      default: null,
    },

    // ✅ Prevent duplicate reminder emails
    reminderSent: {
      type: Boolean,
      default: false,
    },

    // ✅ Prevent duplicate overdue emails
    overdueEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);