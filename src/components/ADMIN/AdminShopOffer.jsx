import { get, getDatabase, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import app from "../../firebase/firebaseconsole";

const AdminShopOffer = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [shopkey, setShopKey] = useState("");

  const [inputFields, setInputFields] = useState([
    {
      offerName: "",
      offerReleaseDate: "",
      offerDiscount: "",
      offerExpier: "",
      offerOriginalPrice: "",
      offerDiscountPrice: "",
      offerImageUrl: "",
    },
  ]);
  console.log(JSON.stringify(inputFields));
  console.log(inputFields);
  // Handle input change
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...inputFields];
    updatedFields[index][name] = value;
    setInputFields(updatedFields);
  };

  // Add a new row of input fields
  const handleAddField = () => {
    setInputFields([
      ...inputFields,
      {
        offerName: "",
        offerDiscription: "",
        offerReleaseDate: "",
        offerDiscount: "",
        offerExpier: "",
        offerOriginalPrice: "",
        offerDiscountPrice: "",
        offerImageUrl: "",
      },
    ]);
  };

  // Remove a specific row of input fields
  const handleRemoveField = (index) => {
    const updatedFields = inputFields.filter((_, i) => i !== index);
    setInputFields(updatedFields);
  };
  const handleSubmit = async () => {
    if (shopkey) {
      const db = getDatabase(app);
      const dataRef = ref(db, `mall/shops/${shopkey}`);
      update(dataRef, {
        shopOffer: inputFields,
      })
        .then(() => {
          alert("offer updated successfully!");
          window.location.reload();
        })
        .catch((error) => {
          alert("Error updating teacher:", error);
        });
    } else {
      alert("No teacher selected to update.");
    }
  };

  const fetchData = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, "mall/shops");
    const snapshot = await get(dataRef);
    const key = Object.keys(snapshot.val())[id];
    setShopKey(key);
    if (snapshot.exists()) {
      console.log(Object.values(snapshot.val())[id]);
      console.log(Object.values(snapshot.val())[id]);
    } else {
      alert("data is not found");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      AdminShopOffer-{id}
      <div className="text-center font-mono">
        <h2>Offer Section</h2>
      </div>
      <button onClick={() => nav(`/admin/view/${id}`)}>Back</button>
      <div className="grid grid-cols-12 font-mono border rounded-md p-4 m-3">
        <div className="grid col-span-9">
          {inputFields.map((inputField, index) => (
            <div className="grid-cols-4 mt-3 grid gap-4 border p-4" key={index}>
              <div className="border ">
                <div>
                  <label htmlFor="offerName">Offer Name</label>
                </div>
                <input
                  id="offerName"
                  required
                  className="border pl-2w-[185px]"
                  type="text"
                  name="offerName"
                  placeholder="Offer Name"
                  value={inputField.name}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="border ">
                <div>
                  <label htmlFor="offerDiscription">Offer Discription</label>
                </div>
                <input
                  id="offerDiscription"
                  className="border pl-2     w-[185px]"
                  type="text"
                  name="offerDiscription"
                  placeholder="offerDiscription"
                  value={inputField.offerDiscription}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              {/* offerName: "",
        offerReleaseDate: "",
        offerDiscription:"",
        offerDiscount: "",
        offerExpier: "",
        offerOriginalPrice: "",
        offerDiscountPrice: "", */}
              <div className="border p-2 ">
                <div>
                  <label htmlFor="offerDiscount">Offer Discount</label>
                </div>
                <input
                  className="border pl-2     w-[185px]"
                  id="offerDiscont"
                  type="text"
                  name="offerDiscount"
                  placeholder="offerDiscount"
                  value={inputField.offerDiscount}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="border ">
                <div>
                  <label htmlFor="offerReleaseDate">Offer Release Date</label>
                </div>
                <input
                  id="offerReleaseDate"
                  className="border pl-2     w-[185px]"
                  type="date"
                  name="offerReleaseDate"
                  placeholder="offerReleaseDate"
                  value={inputField.offerReleaseDate}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="border ">
                <div>
                  <label htmlFor="offerExpier">Offer Expier</label>
                </div>
                <input
                  id="offerExpier"
                  className="border pl-2     w-[185px]"
                  type="date"
                  name="offerExpier"
                  placeholder="offerExpier"
                  value={inputField.offerExpier}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="border ">
                <div>
                  <label htmlFor="offerOriginalPrice">
                    Offer Original Price
                  </label>
                </div>
                <input
                  id="offerOriginalPrice"
                  className="border pl-2     w-[185px]"
                  type="text"
                  name="offerOriginalPrice"
                  placeholder="offerOriginalPrice"
                  value={inputField.offerOriginalPrice}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="border ">
                <div>
                  <label htmlFor="offerDiscountPrice">
                    Offer Discount Price
                  </label>
                </div>
                <input
                  id="offerDiscountPrice"
                  className="border pl-2     w-[185px]"
                  type="text"
                  name="offerDiscountPrice"
                  placeholder="offerDiscountPrice"
                  value={inputField.offerDiscountPrice}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div>
                <button
                  className="bg-red-100   text-red-500 hover:bg-red-200"
                  type="button"
                  onClick={() => handleRemoveField(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-3">
          <button
            className="bg-purple-200 mt-4 border-slate-400 hover:bg-purple-300"
            type="button"
            onClick={handleAddField}
          >
            Add More offer Field
          </button>
        </div>
      </div>
      <div className="float-right m-4">
        <button className="bg-green-100" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminShopOffer;
