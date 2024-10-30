import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import app from "../../firebase/firebaseconsole";
import AdminNavigation from "./AdminNavigation";
import { DownloadTableExcel } from "react-export-table-to-excel";

const AdminMallFloorData = () => {
  const [floorNumber, setFloorNumber] = useState("");
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [message, setMessage] = useState(false);
  const [floorWiseDataToTable, setFloorWiseDataToTable] = useState([]);
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
  const handleShowFloor = () => {
    const floorWiseData = data.filter((item) => item.shopFloor == floorNumber);
    setFloorWiseDataToTable(floorWiseData);
    if (floorWiseData.length > 0) {
      setShowTable(true);
      setMessage(false);
    } else {
      setShowTable(false);
      setMessage(true);
    }
  };

  // const nav = useNavigate();
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
          <AdminNavigation />
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
            <button onClick={handleShowFloor}>Show</button>
          </div>
          {showTable ? (
            <>
              <div className="relative overflow-x-auto">
                <DownloadTableExcel
                  filename="users table"
                  currentTableRef={tableRef.current}
                >
                  <button> Export Excel </button>
                </DownloadTableExcel>
                <table
                  ref={tableRef}
                  className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
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
                    {floorWiseDataToTable &&
                      floorWiseDataToTable.map((item, index) => {
                        return (
                          <>
                            <tr className="border-b-2" key={index}>
                              <td className="px-6 py-4">{item.shopName}</td>
                              <td className="px-6 py-4">
                                {item.shopOwnerName}
                              </td>
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
            </>
          ) : (
            <>
              {message ? (
                <>
                  {" "}
                  <>Shop Do Not Exist on floor {floorNumber}</>
                </>
              ) : null}
            </>
          )}
        </div>
        {/* /admin/list_of_all_shop */}
      </div>
    </div>
  );
};

export default AdminMallFloorData;
