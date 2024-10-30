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
import AdminListAllShop from "./components/ADMIN/AdminListAllShop";
import AdminViewShopID from "./components/ADMIN/AdminViewShopID";
import AdminShopOffer from "./components/ADMIN/AdminShopOffer";
import AdminMallFloorData from "./components/ADMIN/AdminMallFloorData";
import AdminMallCategory from "./components/ADMIN/AdminMallCategory";
import AdminMallShopOwner from "./components/ADMIN/AdminMallShopOwner";

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

        <Route path="/admin/create_shop" element={<AdminCreateShop />} />
        <Route path="/admin_error" element={<AdminError />} />
        <Route path="/admin/list_of_all_shop" element={<AdminListAllShop />} />
        <Route path="/admin/view/:id" element={<AdminViewShopID />} />
        <Route path="/admin/view/offer/:id" element={<AdminShopOffer />} />
        <Route path="/admin/view/floor" element={<AdminMallFloorData />} />
        <Route path="/admin/view/category" element={<AdminMallCategory />} />
        <Route path="/admin/view/shop_owner" element={<AdminMallShopOwner />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
