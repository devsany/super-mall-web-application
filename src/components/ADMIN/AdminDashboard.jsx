import { get, getDatabase, ref } from "firebase/database";
import { NavLink } from "react-router-dom";
import app from "../../firebase/firebaseconsole";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [f1, setF1] = useState([]);
  const [f2, setF2] = useState([]);
  const [f3, setF3] = useState([]);
  const [f4, setF4] = useState([]);
  const [f5, setf5] = useState([]);
  const fetchData = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, "mall/shops");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      setData(Object.values(snapshot.val()));

      setF1(
        Object.values(snapshot.val()).filter((item) => {
          item.shopFloor === "1";
        })
      );
    } else {
      alert("data is not found");
    }
  };
  const floor_1 = data.filter((item) => {
    return item.shopFloor === "1";
  });
  console.log(floor_1);
  const newArray = new Array(10).fill("");
  console.log(newArray);

 
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
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
          <div>
            <div>floor 1:-</div>
            <div>{f1.map()}</div>
          </div>
          <div>floor 2:-</div>
          <div>floor 3:-</div>
          <div>floor 4:-</div>
          <div>floor 5:-</div>
        </div>
        {/* /admin/list_of_all_shop */}
      </div>
    </div>
  );
};

export default AdminDashboard;
