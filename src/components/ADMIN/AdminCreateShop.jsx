import { useState } from "react";
import app from "../../firebase/firebaseconsole";
import { getDatabase, ref, push, set } from "firebase/database";
import { NavLink, useNavigate } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";

const AdminCreateShop = () => {
  const [inputField, setInputField] = useState({
    shopNumber: "",
    shopName: "",
    shopFloor: "",
    shopOwnerName: "",
    shopType: "",
  });
  const [error, setError] = useState({});
  const nav = useNavigate();
  console.log(inputField.shopNumber);
  const handleSubmit = async (e) => {
    // input setup
    e.preventDefault();
    const error = {};
    if (Number(inputField.shopNumber) <= 0) {
      error.er1 = "Number should be greate then 0.";
    } else if (Number(inputField.shopNumber) > 50) {
      error.er2 = "Number should not be greater then 51";
    } else if (!inputField.shopName) {
      error.er3 = "Require";
    } else if (!inputField.shopFloor) {
      error.er4 = "Require";
    } else if (inputField.shopFloor > 6) {
      error.er5 = "Shop has only 5 floor";
    } else if (!inputField.shopOwnerName) {
      error.er6 = "Require";
    } else if (!inputField.shopType) {
      error.er7 = "Require";
    } else {
      const db = getDatabase(app);
      //firebase setup
      const newDocm = push(ref(db, "mall/shops"));
      set(newDocm, {
        shopNumber: inputField.shopNumber,
        shopName: inputField.shopName,
        shopFloor: inputField.shopFloor,
        shopOwnerName: inputField.shopOwnerName,
        shopType: inputField.shopType,
        shopOffer: [""],
      })
        .then(() => {
          alert("data saved successfully");
          window.location.reload();
        })
        .catch((err) => {
          alert("error", err.message);
        });
    }
    setError(error);
  };
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setInputField({ ...inputField, [name]: value });
  //   };
  return (
    <div>
      <div className="text-center p-4">
        <h2 className="font-mono">New Shop Detail</h2>
      </div>
      <div className="grid grid-cols-11">
        <div className="border col-span-2">
          <AdminNavigation />
        </div>
        <div className="col-span-9 border">
          {" "}
          <div className="m-4">
            {/* <button onClick={() => nav("/admin")}>Back</button> */}
            <form onSubmit={handleSubmit}>
              <div className="md:grid md:grid-cols-4 gap-8">
                <div className=" border rounded-md pl-3 pr-3 pt-2 pb-2 mt-3 flex-grow">
                  <div>
                    <label htmlFor="ShopNumber">Shop Number*</label>
                  </div>
                  <input
                    className="border pl-2"
                    type="number"
                    required
                    placeholder="Enter Shop Number"
                    id="ShopNumber"
                    name="ShopNumber"
                    value={inputField.shopNumber}
                    onChange={(e) =>
                      setInputField({
                        ...inputField,
                        shopNumber: e.target.value,
                      })
                    }
                  />
                  <div>{error ? <>{error.er1}</> : null}</div>
                  <div>{error ? <>{error.er2}</> : null}</div>
                </div>
                <div className=" border rounded-md pl-3 pr-3 pt-2 pb-2 mt-3">
                  <div>
                    <label htmlFor="ShopName">Shop Name*</label>
                  </div>
                  <input
                    className="border pl-2"
                    type="text"
                    required
                    placeholder="Enter Shop Name"
                    id="ShopName"
                    name="ShopName"
                    value={inputField.shopName}
                    onChange={(e) =>
                      setInputField({ ...inputField, shopName: e.target.value })
                    }
                  />
                  <div>{error ? <>{error.er3}</> : null}</div>
                </div>
                <div className=" border rounded-md pl-3 pr-3 pt-2 pb-2 mt-3">
                  <div>
                    <label htmlFor="ShopFloor">Shop Floor*</label>
                  </div>
                  <input
                    className="border pl-2"
                    type="number"
                    required
                    placeholder="Enter Mall Floor where shop made"
                    id="ShopFloor"
                    name="ShopFloor"
                    value={inputField.shopFloor}
                    onChange={(e) =>
                      setInputField({
                        ...inputField,
                        shopFloor: e.target.value,
                      })
                    }
                  />
                  <div>{error ? <>{error.er4}</> : null}</div>
                  <div>{error ? <>{error.er5}</> : null}</div>
                </div>
                <div className=" border rounded-md pl-3 pr-3 pt-2 pb-2 mt-3">
                  <div>
                    <label htmlFor="ShopOwnerName">Shop Owner Name*</label>
                  </div>
                  <input
                    className="border pl-2"
                    type="text"
                    required
                    placeholder="Enter Shop Owner Name"
                    id="ShopOwnerName"
                    name="ShopOwnerName"
                    value={inputField.shopOwnerName}
                    onChange={(e) =>
                      setInputField({
                        ...inputField,
                        shopOwnerName: e.target.value,
                      })
                    }
                  />
                  <div>{error ? <>{error.er6}</> : null}</div>
                </div>
                <div className=" border rounded-md pl-3 pr-3 pt-2 pb-2 mt-3">
                  <div>
                    <label htmlFor="ShopType">Shop Type*</label>
                  </div>
                  <select
                    className="border cursor-pointer"
                    name=""
                    id=""
                    onChange={(e) =>
                      setInputField({ ...inputField, shopType: e.target.value })
                    }
                  >
                    <option value="#">Select Catogery of shop</option>
                    <option value="tech">Technology</option>
                    <option value="veg">Vegitable</option>
                    <option value="fruit">Fruit</option>
                    <option value="cyber">Cyber Cafe</option>
                    <option value="chicken">Chicken shop</option>
                  </select>
                  {/* <input
                    className="border pl-2"
                    type="text"
                    required
                    placeholder="Enter Shop Owner Name"
                    id="ShopType"
                    name="ShopType"
                    value={inputField.shopType}
                    onChange={(e) =>
                      setInputField({ ...inputField, shopType: e.target.value })
                    }
                  /> */}
                  <div>{error ? <>{error.er7}</> : null}</div>
                </div>
              </div>
              <div className="float-right m-4">
                <button
                  className="bg-green-100 border-slate-300 border"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /admin/list_of_all_shop */}
      </div>
    </div>
  );
};

export default AdminCreateShop;
