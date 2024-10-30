import { get, getDatabase, ref } from "firebase/database";
import { NavLink } from "react-router-dom";
import app from "../../firebase/firebaseconsole";
import { useEffect, useMemo, useState } from "react";
import AdminNavigation from "./AdminNavigation";

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
  //floor 1
  const floor_1 = useMemo(() => {
    return data.filter((item) => {
      return item.shopFloor === "1";
    });
  }, [data]);
  //floor 2
  const floor_2 = useMemo(() => {
    return data.filter((item) => {
      return item.shopFloor === "2";
    });
  }, [data]);
  //floor 3
  const floor_3 = useMemo(() => {
    return data.filter((item) => {
      return item.shopFloor === "3";
    });
  }, [data]);

  //floor 4
  const floor_4 = useMemo(() => {
    return data.filter((item) => {
      return item.shopFloor === "4";
    });
  }, [data]);

  //floor 5
  const floor_5 = useMemo(() => {
    return data.filter((item) => {
      return item.shopFloor === "5";
    });
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-11">
        <div className="border col-span-2">
          <AdminNavigation />
        </div>
        <div className="col-span-9 border">
          <div className="flex">
            <div>floor 1:-</div>
            <div className="flex">
              {floor_1.length > 0 ? (
                <>
                  {floor_1.map((item, index) => {
                    return (
                      <>
                        <div>{item.shopNumber}</div>
                      </>
                    );
                  })}
                </>
              ) : (
                <>No any Shop</>
              )}
            </div>
          </div>
          <div className="flex">
            <div>floor 2:-</div>
            <div>
              <div className="flex">
                {floor_2.length > 0 ? (
                  <>
                    {floor_2.map((item, index) => {
                      return (
                        <>
                          <div>{item.shopNumber}</div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>No any Shop</>
                )}
              </div>
            </div>
          </div>

          <div className="flex">
            <div>floor 3:-</div>
            <div className="flex">
              {floor_3.length > 0 ? (
                <>
                  {floor_3.map((item, index) => {
                    return (
                      <>
                        <div>{item.shopNumber}</div>
                      </>
                    );
                  })}
                </>
              ) : (
                <>No any Shop</>
              )}
            </div>
          </div>
          <div className="flex">
            <div>floor 4:-</div>
            <div className="flex">
              {floor_4.length > 0 ? (
                <>
                  {floor_4.map((item, index) => {
                    return (
                      <>
                        <div>{item.shopNumber}</div>
                      </>
                    );
                  })}
                </>
              ) : (
                <>No any Shop</>
              )}
            </div>
          </div>
          <div className="flex">
            <div>floor 5:-</div>
            <div className="flex">
              {floor_5.length > 0 ? (
                <>
                  {floor_5.map((item, index) => {
                    return (
                      <>
                        <div>{item.shopNumber}</div>
                      </>
                    );
                  })}
                </>
              ) : (
                <>No any Shop</>
              )}
            </div>
          </div>
        </div>
        {/* /admin/list_of_all_shop */}
      </div>
    </div>
  );
};

export default AdminDashboard;
