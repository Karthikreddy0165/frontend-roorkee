import { useState } from "react";
import Sidebar from "../Utils/Sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-4 text-gray-600">Welcome to the admin panel!</p>
      </div>
    </div>
  );
};

export default Dashboard;
