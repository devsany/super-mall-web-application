// src/App.js

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
