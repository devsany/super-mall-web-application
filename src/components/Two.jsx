import React, { useState } from "react";

const Two = () => {
  const [data1, setData1] = useState("");
  const [item, setItem] = useState([]);
  const [question2, setQuestion2] = useState(false);
  const [error, setError] = useState("");
  const handleStringSubmit = () => {
    if (!data1) {
      setError("The Task Value field is required.");
    } else {
      setItem([...item, data1]);
      setError("");
    }
  };
  const sorted = item.map((item) => {
    return typeof item === "string" && !isNaN(item) ? Number(item) : item;
  });
  const itemString = sorted.filter((item) => typeof item == "string");
  const itemNumber = sorted.filter((item) => typeof item == "number");

  return (
    <div>
      <button className="w-full" onClick={() => setQuestion2(!question2)}>
        Question Number 2
        <br />
        <div className="font-thin">
          Storing input textbox value into an array, displaying the separate
          Number Array and String Array Using Javascript
        </div>
      </button>
      {question2 && (
        <>
          <h2>Task Two</h2>
          <h4>
            Storing input textbox value into an array, displaying the separate
            Number Array and String Array Using Javascript
          </h4>
          <label htmlFor="header">Task Value *</label>
          <input
            id="header"
            name="header"
            className="border"
            type="text"
            value={data1}
            onChange={(e) => setData1(e.target.value)}
          />
          <div className="text-red-600">{error ? <>{error}</> : null}</div>
          <button className="w-full" onClick={handleStringSubmit}>
            Submit
          </button>
          <div className="flex">
            <div className="border p-4">
              Sorted String
              <hr />
              {itemString &&
                itemString.map((item, index) => {
                  return (
                    <>
                      <li key={index}>{item}</li>
                    </>
                  );
                })}
            </div>
            <div className="border p-4 ml-3">
              Sorted Number
              <hr />
              {itemNumber &&
                itemNumber.map((item, index) => {
                  return (
                    <>
                      <li key={index}>{item}</li>
                    </>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Two;
