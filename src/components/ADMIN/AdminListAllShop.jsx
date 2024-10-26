import { get, getDatabase, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import app from "../../firebase/firebaseconsole";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";

const AdminListAllShop = () => {
  const [data, setData] = useState([]);
  const [shopKey, setShopKey] = useState("");
  const nav = useNavigate();

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
  const handleDeleteShop = async (id) => {
    const db = getDatabase(app);
    const dataRef = ref(db, "mall/shops");
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[id];
      setShopKey(key);
      if (key) {
        // Ensure a teacher has been fetched
        const db = getDatabase();
        const teacherRef = ref(db, `mall/shops/${key}`); // Reference to the specific teacher record

        // Remove the teacher's data from the database
        remove(teacherRef)
          .then(() => {
            alert("Teacher deleted successfully!");
            window.location.reload();
            console.log(shopKey);
          })
          .catch((error) => {
            alert("Error deleting teacher:", error);
          });
      } else {
        alert("No teacher selected for deletion.");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="text-center font-mono">
        <h2>All Shop</h2>
      </div>
      <button onClick={() => nav("/admin")}>Back</button>
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
                      <td>
                        <NavLink
                          to={`/admin/view/${index}`}
                          className="bg-blue-100 pl-4 pt-2 pb-2 rounded-md pr-4 hover:text-blue-700 border border-slate-300"
                        >
                          View
                        </NavLink>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteShop(index)}
                          className="bg-red-200 hover:text-red-700 border border-red-300"
                        >
                          Delete
                        </button>
                      </td>
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

export default AdminListAllShop;
