import { useState } from "react";
import app from "../../firebase/firebaseconsole";
import { getDatabase, ref, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const AdminCreateShop = () => {
  const [inputField, setInputField] = useState({
    shopNumber: "",
    shopName: "",
    shopFloor: "",
    shopOwnerName: "",
    shopType: "",
  });
  const nav = useNavigate();
  console.log(inputField.shopNumber);
  const handleSubmit = async (e) => {
    // input setup
    e.preventDefault();

    //firebase setup
    const db = getDatabase(app);
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
      <div className="m-4">
        <button onClick={() => nav("/admin")}>Back</button>
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
                  setInputField({ ...inputField, shopNumber: e.target.value })
                }
              />
              <div>{}</div>
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
              <div>{}</div>
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
                  setInputField({ ...inputField, shopFloor: e.target.value })
                }
              />
              <div>{}</div>
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
              <div>{}</div>
            </div>
            <div className=" border rounded-md pl-3 pr-3 pt-2 pb-2 mt-3">
              <div>
                <label htmlFor="ShopType">Shop Type*</label>
              </div>
              <input
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
              />
              <div>{}</div>
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
  );
};

export default AdminCreateShop;
