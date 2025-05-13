import React, { useEffect, useState } from "react";
import axios from "axios";

const InductionSchedule = () => {
  const [inductions, setInductions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newInduction, setNewInduction] = useState({
    name: "",
    startTime: "",
    endTime: "",
    location: "",
  });

  // Fetch inductions on load
  useEffect(() => {
    fetchInductions();
  }, []);

  const fetchInductions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/induct");
      setInductions(response.data);
    } catch (error) {
      console.error("Error fetching inductions:", error);
    }
  };

  // Create new induction
  const handleCreateInduction = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/induct", newInduction);
      setInductions([...inductions, response.data]); // Add new induction to state
      setShowModal(false);
      setNewInduction({ name: "", startTime: "", endTime: "", location: "" }); // Reset form
    } catch (error) {
      console.error("Error creating induction:", error);
    }
  };

  return (
    <div className="min-h-screen max-w-screen bg-gray-100 p-6">
      <div className="max-w-screen mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">All Induction Schedules</h2>

        <div className="flex justify-end gap-2 mb-4">
          <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Create New Induction
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Assign Interns to Inductions</button>
        </div>

        {/* Induction Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Induction</th>
              <th className="border p-2">Start Time</th>
              <th className="border p-2">End Time</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">View</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {inductions.map((induction) => (
              <tr key={induction._id}>
                <td className="border p-2">{induction.name}</td>
                <td className="border p-2">{new Date(induction.startTime).toLocaleString()}</td>
                <td className="border p-2">{new Date(induction.endTime).toLocaleString()}</td>
                <td className="border p-2">{induction.location}</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded">View/Edit</button>
                </td>
                <td className="border p-2">
                  <button className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Create New Induction</h2>
            <input
              type="text"
              placeholder="Induction Name"
              value={newInduction.name}
              onChange={(e) => setNewInduction({ ...newInduction, name: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="datetime-local"
              placeholder="Start Time"
              value={newInduction.startTime}
              onChange={(e) => setNewInduction({ ...newInduction, startTime: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="datetime-local"
              placeholder="End Time"
              value={newInduction.endTime}
              onChange={(e) => setNewInduction({ ...newInduction, endTime: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Location"
              value={newInduction.location}
              onChange={(e) => setNewInduction({ ...newInduction, location: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleCreateInduction} className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InductionSchedule;
