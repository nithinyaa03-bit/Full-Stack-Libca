import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();
const API = "https://full-stack-libca.onrender.com/api";

export const AppProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [admin, setAdmin] = useState(null);

  /* ================= FETCH ALL DATA ================= */

  useEffect(() => {
    fetchBooks();
    fetchStudents();
    fetchTeachers();
    fetchIssues();
  }, []);

  /* ================= BOOKS ================= */

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API}/books`);
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async (newBook) => {
    try {
      const res = await axios.post(`${API}/books`, newBook);
      setBooks((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const updateBook = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API}/books/${id}`, updatedData);
      setBooks((prev) =>
        prev.map((book) => (book._id === id ? res.data : book))
      );
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API}/books/${id}`);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  /* ================= STUDENTS ================= */

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API}/students`);
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async (newStudent) => {
    try {
      const res = await axios.post(`${API}/students`, newStudent);
      setStudents((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const updateStudent = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API}/students/${id}`, updatedData);
      setStudents((prev) =>
        prev.map((student) =>
          student._id === id ? res.data : student
        )
      );
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API}/students/${id}`);
      setStudents((prev) =>
        prev.filter((student) => student._id !== id)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  /* ================= TEACHERS ================= */

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${API}/teachers`);
      setTeachers(res.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const addTeacher = async (data) => {
    try {
      const res = await axios.post(`${API}/teachers`, data);
      setTeachers((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const updateTeacher = async (id, data) => {
    try {
      const res = await axios.put(`${API}/teachers/${id}`, data);
      setTeachers((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`${API}/teachers/${id}`);
      setTeachers((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  /* ================= ISSUES ================= */

  const fetchIssues = async () => {
    try {
      const res = await axios.get(`${API}/issues`);
      setIssues(res.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const issueBook = async (data) => {
    try {
      const res = await axios.post(`${API}/issues`, data);
      setIssues((prev) => [...prev, res.data]);
      fetchBooks();
    } catch (error) {
      console.error("Error issuing book:", error);
    }
  };

  const returnBook = async (id) => {
    try {
      await axios.put(`${API}/issues/return/${id}`);
      fetchIssues();
      fetchBooks();
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        books,
        students,
        teachers,
        issues,
        admin,

        addBook,
        updateBook,
        deleteBook,

        addStudent,
        updateStudent,
        deleteStudent,

        addTeacher,
        updateTeacher,
        deleteTeacher,

        fetchIssues,
        issueBook,
        returnBook,

        setAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
