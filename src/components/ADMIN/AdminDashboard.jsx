import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="grid grid-cols-11">
        <div className="border col-span-2">
          <div>
            <NavLink to="/admin">OverView Admin panel</NavLink>
          </div>
          <div>
            <NavLink to="/admin/create_shop">Create Shop</NavLink>
          </div>
          <div>
            <NavLink to="/admin/list_of_all_shop">View all Shop</NavLink>
          </div>
          <div>
            <NavLink to="/admin/view/floor">View Floor wise shop</NavLink>
          </div>
        </div>
        <div className="col-span-9 border">content</div>
        {/* /admin/list_of_all_shop */}
      </div>
    </div>
  );
};

export default AdminDashboard;
