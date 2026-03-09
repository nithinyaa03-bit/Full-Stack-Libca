import React, { useMemo } from "react";
import { useApp } from "../store.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const Dashboard = () => {

  const { books, students, issues } = useApp();

  const {
    totalBooks,
    totalStudents,
    issuedBooksCount,
    returnedBooksCount,
    recentActiveIssues,
    overdueBooks
  } = useMemo(() => {

    const totalBooks = books.reduce(
      (acc, book) => acc + Number(book.quantity || 0),
      0
    );

    const totalStudents = students.length;

    let issued = 0;
    let returned = 0;
    const activeIssues = [];
    const overdue = [];

    for (let issue of issues) {

      if (issue.status === "issued") {

        issued++;
        activeIssues.push(issue);

        if (issue.dueDate && new Date(issue.dueDate) < new Date()) {
          overdue.push(issue);
        }

      }

      if (issue.status === "returned") {
        returned++;
      }

    }

    const recentActiveIssues = [...activeIssues]
      .sort(
        (a, b) =>
          new Date(b.issueDate) - new Date(a.issueDate)
      )
      .slice(0, 5);

    return {
      totalBooks,
      totalStudents,
      issuedBooksCount: issued,
      returnedBooksCount: returned,
      recentActiveIssues,
      overdueBooks: overdue
    };

  }, [books, students, issues]);



  const stats = [
    { label: "Total Books", value: totalBooks },
    { label: "Total Students", value: totalStudents },
    { label: "Issued Books", value: issuedBooksCount },
    { label: "Returned Books", value: returnedBooksCount }
  ];


  const chartData = [
    { name: "Books", value: totalBooks },
    { name: "Students", value: totalStudents },
    { name: "Issued", value: issuedBooksCount },
    { name: "Returned", value: returnedBooksCount }
  ];

  const colors = ["#3B82F6", "#22C55E", "#F97316", "#8B5CF6"];



  return (

    <div className="min-h-screen bg-[#e8e2cf] p-8">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            System Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, Library Administrator.
          </p>
        </div>



        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat) => (

            <div
              key={stat.label}
              className="bg-white p-6 rounded-lg shadow-md border"
            >

              <p className="text-sm text-gray-600">
                {stat.label}
              </p>

              <h3 className="text-3xl font-bold text-orange-500 mt-2">
                {stat.value}
              </h3>

            </div>

          ))}

        </div>



        {/* Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border">

          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Library Activity
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={chartData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value">

                {chartData.map((entry, index) => (
                  <Cell key={index} fill={colors[index]} />
                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>



        {/* Recent Issued Books */}
        <div className="bg-white p-6 rounded-lg shadow-md border">

          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Recent Issued Books
          </h2>

          {recentActiveIssues.length === 0 ? (

            <p className="text-gray-600">
              No active issues found.
            </p>

          ) : (

            <table className="w-full text-left border-collapse">

              <thead>

                <tr className="border-b text-gray-700 text-sm">
                  <th className="py-3">Student</th>
                  <th className="py-3">Book</th>
                  <th className="py-3">Issue Date</th>
                </tr>

              </thead>

              <tbody>

                {recentActiveIssues.map((issue) => {

                  const student = students.find(
                    (s) => s.id === issue.studentId
                  );

                  const book = books.find(
                    (b) => b.id === issue.bookId
                  );

                  return (

                    <tr key={issue.id} className="border-b">

                      <td className="py-3">
                        {student ? student.name : "Unknown Student"}
                      </td>

                      <td className="py-3">
                        {book ? book.title : "Unknown Book"}
                      </td>

                      <td className="py-3">
                        {new Date(issue.issueDate).toLocaleDateString()}
                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          )}

        </div>



        {/* Overdue Books */}
        <div className="bg-red-100 p-6 rounded-lg border border-red-300">

          <h2 className="text-xl font-semibold mb-4 text-red-700">
            Overdue Books Alert
          </h2>

          {overdueBooks.length === 0 ? (

            <p>No overdue books.</p>

          ) : (

            <ul className="space-y-2">

              {overdueBooks.map((issue) => {

                const student = students.find(
                  (s) => s.id === issue.studentId
                );

                const book = books.find(
                  (b) => b.id === issue.bookId
                );

                return (

                  <li key={issue.id}>

                    <span className="font-semibold">
                      {student ? student.name : "Unknown Student"}
                    </span>

                    {" "}has not returned "

                    <span className="font-semibold">
                      {book ? book.title : "Unknown Book"}
                    </span>

                    "

                  </li>

                );

              })}

            </ul>

          )}

        </div>



        {/* Library Summary */}
        <div className="bg-yellow-100 p-6 rounded-lg border border-yellow-300">

          <h2 className="text-xl font-semibold mb-4 text-yellow-800">
            Library Summary
          </h2>

          <p>Total Books Available: {totalBooks - issuedBooksCount}</p>

          <p>Total Issued Books: {issuedBooksCount}</p>

          <p>Total Returned Books: {returnedBooksCount}</p>

          <p>Registered Students: {totalStudents}</p>

        </div>



      </div>

    </div>

  );

};

export default Dashboard;