import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <NavLink to="/admin/create_shop">Create Shop</NavLink>
        <NavLink to="/admin/list_of_all_shop">View all Shop</NavLink>
        {/* /admin/list_of_all_shop */}
      </div>
    </div>
  );
};

export default AdminDashboard;
