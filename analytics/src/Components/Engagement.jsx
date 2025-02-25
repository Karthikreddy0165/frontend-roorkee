import { useState } from "react";
import Sidebar from "../Utils/Sidebar";
import { Input, Button } from "../Utils/buttons";
import { ChevronDown } from "lucide-react"; // Import arrow icon

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const areaData = [
  { name: "Jan", logins: 400 },
  { name: "Feb", logins: 300 },
  { name: "Mar", logins: 500 },
  { name: "Apr", logins: 700 },
  { name: "May", logins: 600 },
  { name: "Jun", logins: 800 },
];

const barData = [
  { name: "Scholarships", value: 60 },
  { name: "Job openings", value: 30 },
  { name: "Schemes", value: 40 },
];

const Engagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Search Bar */}
        <div className="flex justify-between items-center mb-6">
          <Input placeholder="Search Engagement..." className="w-1/3" />
          <div className="relative">
            {/* Profile Section */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src="https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp"
                alt="User Profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium text-gray-700">Admin</span>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  My Profile
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Area Chart Section with Text Summary */}
        <div className="flex justify-between items-center mb-16">
          {/* Text Summary */}
          <div className="w-1/4 bg-white p-4 shadow-lg rounded-lg mr-2">
            <h2 className="text-lg font-semibold mb-2">Login Summary</h2>
            <p className="text-gray-600">
              Total Logins This Month:{" "}
              <span className="font-bold text-blue-600">4,200</span>
            </p>
            <p className="text-gray-600">
              Daily Average:{" "}
              <span className="font-bold text-green-600">140</span>
            </p>
            <p className="text-gray-600">
              Peak Day: <span className="font-bold text-red-600">June 10</span>
            </p>
          </div>

          {/* Area Chart */}
          <div className="w-2/4 bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Total Logins Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="logins"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Dropdown */}
          <div className="w-1/4 ml-6">
            <select
              className="border p-3 rounded-lg bg-white shadow-md w-full"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select Engagement Type</option>
              <option value="daily">Daily Engagement</option>
              <option value="weekly">Weekly Engagement</option>
              <option value="monthly">Monthly Engagement</option>
            </select>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="w-full h-96 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Most Visited Pages
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Engagement;
