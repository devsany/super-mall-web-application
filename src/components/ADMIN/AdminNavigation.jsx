import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
  return (
    <div>
      {" "}
      <div className="">
        <div>
          <NavLink
            className="block pt-2 mt-1 ml-1 mr-1 pb-2 text-center border-b-2 transition-transform transform hover:scale-105 text-gray-700 hover:bg-gray-100 rounded-lg"
            to="/admin"
          >
            OverView Admin panel
          </NavLink>
        </div>
        <div>
          <NavLink
            className="block pt-2 mt-1 ml-1 mr-1 pb-2 text-center border-b-2 transition-transform transform hover:scale-105 text-gray-700 hover:bg-gray-100 rounded-lg"
            to="/admin/create_shop"
          >
            Create Shop
          </NavLink>
        </div>
        <div>
          <NavLink
            className="block pt-2 mt-1 ml-1 mr-1 pb-2 text-center border-b-2 transition-transform transform hover:scale-105 text-gray-700 hover:bg-gray-100 rounded-lg"
            to="/admin/list_of_all_shop"
          >
            View all Shop
          </NavLink>
        </div>
        <div>
          <NavLink
            className="block pt-2 mt-1 ml-1 mr-1 pb-2 text-center border-b-2 transition-transform transform hover:scale-105 text-gray-700 hover:bg-gray-100 rounded-lg"
            to="/admin/view/floor"
          >
            View Floor wise shop
          </NavLink>
        </div>
        <div>
          <NavLink
            className="block pt-2 mt-1 ml-1 mr-1 pb-2 text-center border-b-2 transition-transform transform hover:scale-105 text-gray-700 hover:bg-gray-100 rounded-lg"
            to="/admin/view/category"
          >
            View Category shop
          </NavLink>
        </div>
        <div>
          <NavLink
            className="block pt-2 mt-1 ml-1 mr-1 pb-2 text-center border-b-2 transition-transform transform hover:scale-105 text-gray-700 hover:bg-gray-100 rounded-lg"
            to="/admin/view/shop_owner"
          >
            View Shop Owner
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminNavigation;
