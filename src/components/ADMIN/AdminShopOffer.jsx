import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminShopOffer = () => {
  const { id } = useNavigate();
  const [inputFields, setInputFields] = useState([
    {
      offerName: "",
      offerReleaseDate: "",
      offerDiscount: "",
      offerExpier: "",
      offerOriginalPrice: "",
      offerDiscountPrice: "",
    },
  ]);

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
      },
    ]);
  };

  // Remove a specific row of input fields
  const handleRemoveField = (index) => {
    const updatedFields = inputFields.filter((_, i) => i !== index);
    setInputFields(updatedFields);
  };
  const handleSubmit = () => {
    if (!inputFields.offerName) console.log(inputFields);
  };
  return (
    <div>
      AdminShopOffer-{id}
      <div className="text-center font-mono">
        <h2>Offer Section</h2>
      </div>
      <div className="grid grid-cols-12 border rounded-md p-4 m-3">
        <div className="grid col-span-9">
          {inputFields.map((inputField, index) => (
            <div className="grid-cols-4 mt-3 grid" key={index}>
              <div>
                <input
                  required
                  className="border pl-2 m-2"
                  type="text"
                  name="offerName"
                  placeholder="Offer Name"
                  value={inputField.name}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div>
                <input
                  className="border pl-2 m-2"
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
              <div>
                <input
                  className="border pl-2 m-2"
                  type="text"
                  name="offerDiscount"
                  placeholder="offerDiscount"
                  value={inputField.offerDiscount}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div>
                <input
                  className="border pl-2 m-2"
                  type="text"
                  name="offerExpier"
                  placeholder="offerExpier"
                  value={inputField.offerExpier}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div>
                <input
                  className="border pl-2 m-2"
                  type="text"
                  name="offerOriginalPrice"
                  placeholder="offerOriginalPrice"
                  value={inputField.offerOriginalPrice}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div>
                <input
                  className="border pl-2 m-2"
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