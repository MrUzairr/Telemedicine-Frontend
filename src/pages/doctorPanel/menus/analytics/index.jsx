import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const AnalyticsTab = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  // Example static data; replace with API fetch if you want real data
  useEffect(() => {
    setTimeout(() => {
      setStats({
        patientsCount: 120,
        documentsUploaded: 340,
        avgSeverity: 5.7,
        patientVisitsLast7Days: [12, 18, 20, 15, 22, 30, 25],
        genderDistribution: { male: 70, female: 50 },
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );

  const { patientsCount, documentsUploaded, avgSeverity, patientVisitsLast7Days, genderDistribution } = stats;

  const barData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Patient Visits",
        data: patientVisitsLast7Days,
        backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind blue-500 with opacity
      },
    ],
  };

  const pieData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [genderDistribution.male, genderDistribution.female],
        backgroundColor: ["#3b82f6", "#ec4899"], // blue-500 and pink-500 from Tailwind
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Analytics Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <p className="text-xl font-bold text-blue-700">{patientsCount}</p>
          <p className="text-gray-700">Total Patients</p>
        </div>
        <div className="bg-pink-100 p-4 rounded-lg text-center">
          <p className="text-xl font-bold text-pink-600">{documentsUploaded}</p>
          <p className="text-gray-700">Documents Uploaded</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <p className="text-xl font-bold text-yellow-700">{avgSeverity.toFixed(1)}</p>
          <p className="text-gray-700">Avg Severity Level</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Patient Visits Last 7 Days</h3>
          <Bar data={barData} />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Gender Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
