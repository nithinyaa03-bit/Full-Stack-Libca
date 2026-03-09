import React from "react";
import { useApp } from "../store.jsx";
import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";

const Reports = () => {

const { books, students, issues } = useApp();

// Filter issues
const issuedBooks = issues.filter((issue) => issue.status === "issued");
const returnedBooks = issues.filter((issue) => issue.status === "returned");

// Chart data
const chartData = [
{ name: "Issued", value: issuedBooks.length },
{ name: "Returned", value: returnedBooks.length }
];

return (
  <div className="p-6 space-y-6">

  <h1 className="text-3xl font-bold text-gray-800">
    Library Reports
  </h1>

  {/* SUMMARY CARDS */}

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-white shadow rounded-xl p-5">
      <p className="text-gray-500 text-sm">Total Books</p>
      <h2 className="text-2xl font-bold mt-1">
        {books?.length || 0}
      </h2>
    </div>

    <div className="bg-white shadow rounded-xl p-5">
      <p className="text-gray-500 text-sm">Total Students</p>
      <h2 className="text-2xl font-bold mt-1">
        {students?.length || 0}
      </h2>
    </div>

    <div className="bg-white shadow rounded-xl p-5">
      <p className="text-gray-500 text-sm">Issued Books</p>
      <h2 className="text-2xl font-bold mt-1">
        {issuedBooks.length}
      </h2>
    </div>

    <div className="bg-white shadow rounded-xl p-5">
      <p className="text-gray-500 text-sm">Returned Books</p>
      <h2 className="text-2xl font-bold mt-1">
        {returnedBooks.length}
      </h2>
    </div>

  </div>

  {/* CHART */}

  <div className="bg-white shadow rounded-xl p-6">

    <h2 className="text-lg font-semibold mb-4">
      Issued vs Returned Books
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </ResponsiveContainer>

  </div>

  {/* RETURNED BOOKS TABLE */}

  <div className="bg-white shadow rounded-xl overflow-hidden">

    <div className="p-4 border-b">
      <h2 className="text-lg font-semibold">
        Returned Books History
      </h2>
    </div>

    <table className="min-w-full divide-y divide-gray-200">

      <thead className="bg-gray-50">
        <tr>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Book
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Student
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Issue Date
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Due Date
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Return Date
          </th>

        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">

        {returnedBooks.length === 0 ? (

          <tr>
            <td
              colSpan="5"
              className="text-center py-8 text-gray-400"
            >
              No returned books yet
            </td>
          </tr>

        ) : (

          returnedBooks.map((issue) => (

            <tr key={issue._id}>

              <td className="px-6 py-4 font-medium">
                {issue.book?.title || "Unknown Book"}
              </td>

              <td className="px-6 py-4 text-indigo-600">
                {issue.student?.name || "Unknown Student"}
              </td>

              <td className="px-6 py-4 text-sm">
                {new Date(issue.issueDate).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-sm">
                {new Date(issue.dueDate).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-sm">
                {issue.returnDate
                  ? new Date(issue.returnDate).toLocaleDateString()
                  : "-"}
              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</div>

);
};

export default Reports;
