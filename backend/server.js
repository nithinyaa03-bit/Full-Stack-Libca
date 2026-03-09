const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/books", require("./routes/bookroutes"));
app.use("/api/students", require("./routes/studentroutes"));
app.use("/api/issues", require("./routes/issueroutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));

/* =========================
   HEALTH CHECK ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("📚 Library Management System API Running");
});

/* =========================
   TEST EMAIL ROUTE
========================= */
app.get("/test-email", async (req, res) => {
  try {
    const sendEmail = require("./utils/sendEmail");

    await sendEmail(process.env.EMAIL, "Test Email");

    res.send("✅ Test email sent successfully!");
  } catch (error) {
    console.error("Email test failed:", error);
    res.status(500).send("❌ Email failed");
  }
});

/* =========================
   CRON JOB
========================= */
const scheduleDueDateReminders = require("./cron/reminderJob");

/* =========================
   MONGODB CONNECTION
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    // Start reminder scheduler after DB connects
    scheduleDueDateReminders();
    console.log("📅 Reminder scheduler started");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌", err);
  });

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});