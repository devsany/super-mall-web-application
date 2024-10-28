import { forceLongPolling, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useMemo, useState } from "react";
import app from "../../firebase/firebaseconsole";
import { NavLink, useNavigate } from "react-router-dom";
import { query } from "firebase/firestore";

const AdminMallFloorData = () => {
  const [floorNumber, setFloorNumber] = useState(0);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, "mall/shops");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      setData(Object.values(snapshot.val()));
    } else {
      alert("data is not found");
    }
  };

  const nav = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {" "}
      <div className="text-center p-4 font-mono">
        <h2>All Shop</h2>
      </div>
      <div className="grid grid-cols-11">
        <div className="border col-span-2">
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
        </div>
        <div className="col-span-9 border">
          {/* <button onClick={() => nav("/admin")}>Back</button> */}

          <div>
            <label htmlFor="floorNumber">Floor Number</label>
            <input
              type="number"
              placeholder="Enter floor number"
              onChange={(e) => setFloorNumber(e.target.value)}
            />
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Shop Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Shop Owner Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Shop Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mall Floor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Shop Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => {
                    return (
                      <>
                        <tr className="border-b-2" key={index}>
                          <td className="px-6 py-4">{item.shopName}</td>
                          <td className="px-6 py-4">{item.shopOwnerName}</td>
                          <td className="px-6 py-4">{item.shopNumber}</td>
                          <td className="px-6 py-4">{item.shopFloor}</td>
                          <td className="px-6 py-4">{item.shopType}</td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* /admin/list_of_all_shop */}
      </div>
    </div>
  );
};

export default AdminMallFloorData;
