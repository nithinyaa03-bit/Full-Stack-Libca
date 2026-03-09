const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (to, taskTitle) => {
  try {
    const mailOptions = {
      from: `"Task Reminder System" <${process.env.EMAIL}>`,
      to: to,
      subject: "Task Reminder",
      text: `Reminder: Your task "${taskTitle}" is due tomorrow.`
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.response);

  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

module.exports = sendEmail;