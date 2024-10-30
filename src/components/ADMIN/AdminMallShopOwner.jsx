import { useEffect, useRef, useState } from "react";
import AdminNavigation from "./AdminNavigation";
import { get, getDatabase, ref } from "firebase/database";
import app from "../../firebase/firebaseconsole";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";

const AdminMallShopOwner = () => {
  const [owner, setOwner] = useState("");
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [toggle, setToggle] = useState(false);
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
  console.log(data);
  const handleSubmit = () => {
    setToggle(true);
    console.log(typeof owner);
    const data1 = data.filter((item) => {
      return item.shopFloor === owner;
    });
    setMainData(data1);
  };
  console.log(mainData);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {" "}
      <div className="text-center p-4 font-mono">
        <h2>Category Wise</h2>
      </div>
      <div className="grid grid-cols-11">
        <div className="border col-span-2">
          <AdminNavigation />
        </div>
        <div className=" border col-span-9">
          <label htmlFor="owner">Search Floor wise Owner</label>
          <select
            className="border"
            name=""
            id=""
            onChange={(e) => setOwner(e.target.value)}
          >
            <option value="">Select Floor wise Owner</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button onClick={handleSubmit}>Submit</button>
          <div>
            <div className="relative overflow-x-auto">
              {toggle && (
                <DownloadTableExcel
                  filename="users table"
                  currentTableRef={tableRef.current}
                >
                  <button> Export Excel </button>
                </DownloadTableExcel>
              )}
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
                  {mainData.length > 0 ? (
                    <>
                      {mainData.map((item, index) => {
                        return (
                          <>
                            <tr
                              className="border-b-2  hover:bg-blue-100"
                              key={index}
                            >
                              <td className="px-6 text-center py-4">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 ">{item.shopName}</td>
                              <td className="px-6 py-4 font-bold">
                                {item.shopOwnerName}
                              </td>
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
                            </tr>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <div className="text-xl flex justify-center">
                      <div>No Shop owner Available</div>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMallShopOwner;
