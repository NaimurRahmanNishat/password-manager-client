/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  useGetSheetsQuery,
  useCreateSheetMutation,
  useUpdateSheetMutation,
  useDeleteSheetMutation,
} from "@/redux/features/sheet/sheetApi";

const TypingSpeedTable: React.FC = () => {
  const { data: sheets, isLoading, error } = useGetSheetsQuery();
  const [createSheet] = useCreateSheetMutation();
  const [updateSheet] = useUpdateSheetMutation();
  const [deleteSheet] = useDeleteSheetMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    account: "",
    other: "",
  });

  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    email: "",
    password: "",
    account: "",
    other: "",
  });

  // ✅ Auto-save debounce for new entry
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const { email, password, account, other } = formData;

      if (email.trim() || password.trim() || account.trim() || other.trim()) {
        createSheet(formData)
          .unwrap()
          .then(() => {
            setFormData({ email: "", password: "", account: "", other: "" });
          })
          .catch((err) => console.error("❌ Error saving:", err));
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [formData]);

  // ✅ Update row handler
  const handleUpdate = (id: string) => {
    updateSheet({ _id: id, ...editData })
      .unwrap()
      .then(() => {
        setEditRowId(null);
      })
      .catch((err) => console.error("❌ Update failed:", err));
  };

  // ✅ Delete row handler
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this row?")) {
      deleteSheet(id).catch((err) =>
        console.error("❌ Delete failed:", err)
      );
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load data.</p>;

  return (
    <div className="overflow-x-auto p-6 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
        Document Report Sheet
      </h2>

      {/* Input Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {["email", "password", "account", "other"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="p-2 border rounded"
            value={formData[field as keyof typeof formData]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [field]: e.target.value,
              }))
            }
          />
        ))}
      </div>

      {/* Data Table */}
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-xl overflow-hidden">
        <thead className="bg-blue-100 text-blue-900">
          <tr>
            <th className="py-3 px-4 text-center">Email or Phone</th>
            <th className="py-3 px-4 text-center">Password</th>
            <th className="py-3 px-4 text-center">Account Name</th>
            <th className="py-3 px-4 text-center">Others</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sheets?.map((row, index) => {
            const isEditing = editRowId === row._id;

            return (
              <tr
                key={row._id || index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {["email", "password", "account", "other"].map((field) => (
                  <td key={field} className="py-2 px-4 border text-center">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border px-2 py-1 rounded w-full"
                        value={editData[field as keyof typeof editData]}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      row[field as keyof typeof row]
                    )}
                  </td>
                ))}

                {/* Actions */}
                <td className="py-2 px-4 border text-center space-x-2">
                  {isEditing ? (
                    <button
                      onClick={() => handleUpdate(row._id!)}
                      className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditRowId(row._id!);
                        setEditData({
                          email: row.email,
                          password: row.password,
                          account: row.account,
                          other: row.other,
                        });
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Update
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(row._id!)}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TypingSpeedTable;
