import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import app from "../../firebase/firebaseconsole";
import AdminNavigation from "./AdminNavigation";
import { DownloadTableExcel } from "react-export-table-to-excel";

const AdminMallCategory = () => {
  const [data, setData] = useState([]);
  const [inputField, setInputField] = useState("");
  const [mainData, setMainData] = useState([]);
  const [initial, setInitial] = useState(0);
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

  const handleClick = () => {
    setToggle(true);
    console.log(inputField);
    const category_filter_data = data.filter(
      (item) => item.shopType === inputField
    );
    setMainData(category_filter_data);
    console.log(category_filter_data);
  };
  console.log(mainData);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="text-center p-4 font-mono">
        <h2>Category Wise</h2>
      </div>
      <div className="grid grid-cols-11">
        <div className="border col-span-2">
          <AdminNavigation />
        </div>
        <div className=" border col-span-9">
          <label htmlFor="category">Chose Category</label>
          <select
            className="border cursor-pointer"
            name=""
            id=""
            onChange={(e) => setInputField(e.target.value)}
          >
            <option value="#">Select Catogery of shop</option>
            <option value="tech">Technology</option>
            <option value="veg">Vegitable</option>
            <option value="fruit">Fruit</option>
            <option value="cyber">Cyber Cafe</option>
            <option value="chicken">Chicken Shop</option>
          </select>
          <div>
            <button onClick={handleClick}>Submit</button>
          </div>

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
                    {mainData.slice(initial, initial + 5).map((item, index) => {
                      return (
                        <>
                          <tr
                            className="border-b-2  hover:bg-blue-100"
                            key={index}
                          >
                            <td className="px-6 text-center py-4">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4">{item.shopName}</td>
                            <td className="px-6 py-4">{item.shopOwnerName}</td>
                            <td className="px-6 py-4">{item.shopNumber}</td>
                            <td className="px-6 py-4">{item.shopFloor}</td>
                            <td className="px-6 py-4">{item.shopType}</td>
                          </tr>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <div className="flex justify-center">Data Not Abailable</div>
                )}
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
      </div>
    </div>
  );
};

export default AdminMallCategory;
