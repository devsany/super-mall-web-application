import { forceLongPolling, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useMemo, useState } from "react";
import app from "../../firebase/firebaseconsole";
import { useNavigate } from "react-router-dom";
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
      <div className="text-center font-mono">
        <h2>All Shop</h2>
      </div>
      <button onClick={() => nav("/admin")}>Back</button>
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
  );
};

export default AdminMallFloorData;
