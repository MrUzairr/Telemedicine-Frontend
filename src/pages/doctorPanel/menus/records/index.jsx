import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FileText,
  CalendarDays,
  HeartPulse,
  User,
  Clock,
} from "lucide-react";

const PatientProfileCard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = "https://ten-reminiscent-sombrero.glitch.me"; // base URL for API & file access
//   const baseURL = "http://localhost:3006"; // base URL for API & file access

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${baseURL}/patient-symptoms`);
        if (response.data.success) {
          setPatients(response.data.patients);
        } else {
          setError("Failed to fetch patients");
        }
      } catch (err) {
        setError("Error fetching patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-gray-500 text-lg">Loading patient data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-red-600 text-lg">{error}</span>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-gray-500 text-lg">No patient records found.</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Patients Documents & Details
      </h1>

      <div className="grid gap-8">
        {patients.map((patient) => {
          const {
            _id,
            name,
            dob,
            gender,
            symptom,
            severity,
            symptomDuration,
            fileUrl,
            createdAt,
          } = patient;
          const getFileNameFromPath = (filePath) => {
            return filePath.split('\\').pop().split('/').pop(); // naive extraction of filename
          }
          

          const fileName = fileUrl ? getFileNameFromPath(fileUrl) : null;
          const fullFileUrl = fileName ? `${baseURL}/public/patientData/${encodeURIComponent(fileName)}` : null;
          const handleDocument = () => {
            window.open(fullFileUrl, "_blank", "noopener,noreferrer");
          };
          

          return (
            <div
              key={_id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-4">
                  <User className="text-blue-600" size={28} />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {name}
                  </h2>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <CalendarDays size={18} />
                  {new Date(createdAt).toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                <p>
                  <strong>Gender:</strong> {gender}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {dob}
                </p>
                <p>
                  <strong>Symptoms:</strong> {symptom}
                </p>
                <p>
                  <strong>Severity Level:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded text-white font-semibold ${
                      severity >= 8
                        ? "bg-red-500"
                        : severity >= 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {severity}
                  </span>
                </p>
                <p>
                  <strong>Symptom Duration:</strong> {symptomDuration}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-md font-medium mb-2 flex items-center gap-2 text-gray-800">
                  <FileText size={18} />
                  Uploaded Document:
                </h3>
                {fullFileUrl ? (
                  <button
                    onClick={handleDocument}
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    View / Download
                  </button>
                ) : (
                  <p className="text-gray-500">No document uploaded.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientProfileCard;
