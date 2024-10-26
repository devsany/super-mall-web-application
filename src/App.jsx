// src/App.js

import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import AdminLogin from "./components/ADMIN/AdminLogin";
import AdminDashboard from "./components/ADMIN/AdminDashboard";
import Home from "./components/Home";
import AdminError from "./components/ADMIN/AdminError";
import AdminCreateShop from "./components/ADMIN/AdminCreateShop";

const App = () => {
  return (
    <Router>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/admin_login">Admin Login</NavLink>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* admin section */}

        <Route
          path="/admin/create_shop"
          element={<AdminCreateShop />}
        />
        <Route path="/admin_error" element={<AdminError />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
