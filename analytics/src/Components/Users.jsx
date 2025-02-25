import { useState } from "react";
import Sidebar from "../Utils/Sidebar";
import { Input, Button } from "../Utils/buttons";
import { ChevronDown } from "lucide-react"; // Import arrow icon

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 40 },
  { name: "Apr", value: 80 },
  { name: "May", value: 70 },
  { name: "Jun", value: 100 },
];

const Users = () => {
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
          <Input placeholder="Search Users..." className="w-1/3" />
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

        {/* Dropdown in Center */}
        <div className="flex justify-center items-center my-10 mb-[200px]">
          <select
            className="border p-3 rounded-lg bg-white shadow-md w-1/2"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Select an Option</option>
            <option value="active">Active Users</option>
            <option value="inactive">Inactive Users</option>
            <option value="Users by Caste Category">
              Users by Caste Category
            </option>
            <option value="Users by Age Group">Users by Age Group</option>
            <option value="Users by Location">Users by Location</option>
            <option value="Users by Education Level">
              Users by Education Level
            </option>
          </select>
        </div>

        {/* Bar Chart */}
        <div className="w-full h-96 mt-10 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Most Applied Schemes</h2>
          <p className="mb-4">
            The top trending programs users are applying for.
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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

export default Users;
