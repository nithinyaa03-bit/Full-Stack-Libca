import React from "react";
import libca1 from "../assets/libca1.jpg"
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
  <section>
    <div className="min-h-screen w-full bg-center bg-cover relative opacity-90" 
      style={{ backgroundImage: `url(${libca1})` }}
      >
      {/* Dark overlay with heavy gradient from bottom to top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-24">
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wide">
          Library management system for BCA
        </h1>

        {/* Paragraph */}
        <p className="text-lg md:text-xl text-white max-w-2xl mb-8">
          Discover thousands of books, journals, and digital resources — all in one place.
        </p>

        <div className="flex gap-4">
          {/* Login button */}
          <Link to="/adminlogin">
            <button className="bg-amber-700 text-white hover:bg-amber-600 px-6 py-3 rounded-lg font-semibold transition">
              Login
            </button>
          </Link>
        </div>
      </div>
      </div>
  </section>

  <section className="py-16 bg-[#FFFBEB]">
    <div className="max-w-4xl mx-auto px-6 text-left">
      <p className="text-base md:text-lg text-[#78350F] leading-relaxed">
        The purpose of college department libraries is to serve as a central hub for information access, supporting teaching and learning, facilitating research, and promoting information literacy. They provide a diverse collection of resources, including books, journals, and digital materials, to enhance the academic experience and foster a culture of lifelong learning.
      </p>
    </div>
  </section>
  </>
  );
}

export default Homepage;