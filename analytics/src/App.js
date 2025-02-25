import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Overview from "./Components/overview";
import Preferences from "./Components/Preferences";
import Users from "./Components/Users";
import Engagement from "./Components/Engagement";
import Applications from "./Components/Applications";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
       
          <Route
          path="/overview"
          element={isAuthenticated ? <Overview/> : <Navigate to="/overview" />}
        />
         <Route
          path="/Preferences"
          element={isAuthenticated ? <Preferences/> : <Navigate to="/preferences" />}
        />
         <Route
          path="/Users"
          element={isAuthenticated ? <Users/> : <Navigate to="/Users" />}
        />
         <Route
          path="/Engagement"
          element={isAuthenticated ? <Engagement/> : <Navigate to="/Engagement" />}
        />
         <Route
          path="/Applications"
          element={isAuthenticated ? <Applications/> : <Navigate to="/Applications" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
