import { get, getDatabase, ref, remove } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import app from "../../firebase/firebaseconsole";
import { NavLink, useNavigate } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";
import { DownloadTableExcel } from "react-export-table-to-excel";

const AdminListAllShop = () => {
  const [data, setData] = useState([]);
  const [shopKey, setShopKey] = useState("");
  const nav = useNavigate();
  const [initial, setInitial] = useState(0);
  const tableRef = useRef(null);
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
      <div className="text-center p-4 font-mono">
        <h2>All Shop</h2>
      </div>

      <div className="grid grid-cols-11">
        <div className="border col-span-2">
          <AdminNavigation />
        </div>
        <div className="col-span-9 border">
          {/* <button onClick={() => nav("/admin")}>Back</button> */}
          <div className="relative overflow-x-auto">
            <DownloadTableExcel
              filename="users table"
              currentTableRef={tableRef.current}
            >
              <button> Export excel </button>
            </DownloadTableExcel>
            <table
              ref={tableRef}
              className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S No.
                  </th>
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
              <tbody className="transition-opacity duration-500">
                {data &&
                  data.map((item, index) => {
                    return (
                      <>
                        <tr
                          className="border-b-2  hover:bg-blue-100"
                          key={index}
                        >
                          <td className="px-6 text-center py-4">{index + 1}</td>
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
          {/* <div className="float-end">
            page - {initial == 0 ? 1 : <>{initial - 3}</>}
          </div> */}
          {initial > 0 && (
            <button onClick={() => setInitial(initial - 5)}>Previous</button>
          )}
          {initial <= data.length && (
            <button
              onClick={() => {
                setInitial(initial + 5);
              }}
            >
              Next
            </button>
          )}
        </div>
        {/* /admin/list_of_all_shop */}
      </div>
    </div>
  );
};

export default AdminListAllShop;
