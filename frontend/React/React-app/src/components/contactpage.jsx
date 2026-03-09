const Contact = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-[#FFFBEB]">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#451A03]">Contact Us</h1>
        <p className="text-[#78350F] mt-2">
          We’d love to hear from you. Please fill out the form below.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-md">

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#451A03]">Get in Touch</h2>
          <p className="text-[#78350F] mb-6">
            If you have any questions about books, memberships, or services,
            feel free to contact us.
          </p>

          <div className="space-y-4 text-[#78350F]">
            <p>📍 Address: LIBCA Library, HICAS</p>
            <p>📞 Phone: +91 </p>
            <p>✉️ Email: libca.library@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B45309]"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B45309]"
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B45309]"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#B45309] text-white py-3 rounded-md hover:bg-[#92400E] transition"
          >
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;