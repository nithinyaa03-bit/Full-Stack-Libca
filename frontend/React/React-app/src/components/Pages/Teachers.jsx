import React, { useState } from "react";
import { useApp } from "../store.jsx";

const Teachers = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingTeacher) {
      await updateTeacher(editingTeacher._id, formData);
    } else {
      await addTeacher(formData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", department: "" });
    setEditingTeacher(null);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Teacher Management
          </h1>
          <p className="text-gray-500">
            View and manage library members.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Register Teacher
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Department
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {teachers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No teachers registered yet
                </td>
              </tr>
            )}

            {teachers.map((teacher) => (
              <tr key={teacher._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {teacher.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {teacher.email}
                </td>

                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-semibold uppercase">
                    {teacher.department}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-3">
                  {/* UPDATE */}
                  <button
                    onClick={() => {
                      setEditingTeacher(teacher);
                      setFormData({
                        name: teacher.name,
                        email: teacher.email,
                        department: teacher.department,
                      });
                      setShowModal(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Update
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteTeacher(teacher._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 bg-amber-600 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {editingTeacher ? "Edit Teacher" : "Register Teacher"}
              </h3>
              <button onClick={resetForm}>X</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  required
                  className="w-full px-3 py-2 border rounded-lg mt-1"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-lg mt-1"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {/* DEPARTMENT */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border rounded-lg mt-1"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  <option value="">Select Department</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>

              {/* CANCEL */}
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl"
              >
                Cancel
              </button>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl"
              >
                {editingTeacher ? "Update Details" : "Register Now"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;
