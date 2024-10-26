import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <NavLink to="/admin/create_shop">Create Shop</NavLink>
      </div>
    </div>
  );
};

export default AdminDashboard;
