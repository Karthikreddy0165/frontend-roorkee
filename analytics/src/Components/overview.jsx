import { useState } from "react";
import Sidebar from "../Utils/Sidebar";
import { ChevronDown } from "lucide-react"; // Import arrow icon
import fitlericon from "../assets/setting-4.svg";

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
import { Progress, Input, Button } from "../Utils/buttons";

const data = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 40 },
  { name: "Apr", value: 80 },
  { name: "May", value: 70 },
  { name: "Jun", value: 100 },
];

const castedata = [
  { name: "SC", value: 30 },
  { name: "ST", value: 50 },
  { name: "OBC", value: 40 },
  { name: "EWS", value: 80 },
];

const Overview = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <Input placeholder="Search..." className="w-1/3" />
          <div className="flex items-center space-x-4">
            {/* User Profile Section */}
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
        </div>

        {/* Overview Section */}
        <div className="flex justify-between items-center p-4 mb-4 ">
          {/* Left Section - Title & Description */}
          <div>
            <h1 className="font-semibold text-xl">Overview</h1>
            <p className="text-gray-600 text-lg">
              Track users' engagement and performance
            </p>
          </div>

          {/* Right Section - Buttons */}
          <div className="flex space-x-4">
            <Button variant="outline">
              {/* <img src={fitlericon} />  */}
              Filter
            </Button>
            <Button variant="outline">Export</Button>
          </div>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 gap-3 shadow-lg rounded-lg flex flex-row items-center">
            <Progress value={75} className="w-24 h-24" />
            <h2 className="text-[20px] font-semibold mb-2">
              Application Success Rate
            </h2>
          </div>
          <div className="bg-white p-4 gap-6 shadow-lg rounded-lg flex flex-row items-center">
            <Progress value={60} className="w-24 h-24" />
            <h2 className="text-[20px] font-semibold mb-2">
              User Engagement Rate
            </h2>
          </div>
          <div className="bg-white p-4 gap-6 shadow-lg rounded-lg flex flex-row items-center">
            <Progress value={85} className="w-24 h-24" />
            <h2 className="text-[20px] font-semibold mb-2">
              Growth Rate of New Registrations
            </h2>
          </div>
        </div>

        {/* Bar Charts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full h-96 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Most Applied Schemes</h2>
            <p className="text-sm mb-4">
              The top trending programs users are applying for.
            </p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full h-96 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Most Popular Category
            </h2>
            <p className="text-sm mb-4">Most Applied Category Applications</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={castedata}>
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
    </div>
  );
};

export default Overview;
