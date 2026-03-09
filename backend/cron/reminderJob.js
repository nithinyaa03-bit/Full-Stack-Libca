const cron = require("node-cron");
const Issue = require("../models/issue");
const sendEmail = require("../utils/sendEmail");

const scheduleDueDateReminders = () => {
  cron.schedule(
    "0 9 * * *", // Runs every day at 9 AM
    async () => {
      console.log("🔍 Checking due date reminders...");

      try {
        // Get all issued books and populate student + book details
        const issues = await Issue.find({ status: "issued" })
          .populate("student")
          .populate("book");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const issue of issues) {
          const dueDate = new Date(issue.dueDate);
          dueDate.setHours(0, 0, 0, 0);

          const daysUntilDue = Math.ceil(
            (dueDate - today) / (1000 * 60 * 60 * 24)
          );

          const student = issue.student;
          const book = issue.book;

          if (!student || !book) continue;

          // 📩 Send reminder 1 day before due date
          if (daysUntilDue === 1 && !issue.reminderSent) {
            await sendEmail(
              student.email,
              "📚 Book Due Tomorrow - Reminder",
              `Hello ${student.name},

Your borrowed book "${book.title}" is due tomorrow (${dueDate.toDateString()}).

Please return it on time to avoid late fines.

Thank you,
Library Management System`
            );

            issue.reminderSent = true;
            await issue.save();

            console.log(`Reminder sent to ${student.email}`);
          }

          // ⚠ Mark as overdue and send overdue email (only once)
          if (daysUntilDue < 0 && !issue.overdueEmailSent) {
            issue.status = "overdue";
            issue.overdueEmailSent = true;
            await issue.save();

            await sendEmail(
              student.email,
              "📚 Overdue Book - Please Return",
              `Hello ${student.name},

Your borrowed book "${book.title}" was due on ${dueDate.toDateString()} and is now overdue.

Please return it as soon as possible to avoid additional fines.

Thank you,
Library Management System`
            );

            console.log(`Overdue email sent to ${student.email}`);
          }
        }

        console.log("✅ Due date reminder check complete.");
      } catch (error) {
        console.error("❌ Reminder job error:", error);
      }
    },
    { timezone: "Asia/Kolkata" }
  );
};

module.exports = scheduleDueDateReminders;
