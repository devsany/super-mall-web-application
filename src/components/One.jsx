import React, { useState } from "react";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";

const One = () => {
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [item, setItem] = useState([]);
  const [question1, setQuestion1] = useState(false);
  const [question2, setQuestion2] = useState(false);
  const [error1, setError1] = useState("");
  const handleSubmit = () => {
    if (!data) {
      setError1("The Task Value field is required.");
    } else {
      setError1("");
      setItem([...item, data]);
      setData("");
    }
  };
  const sortedData = item.map((element) => {
    return typeof element === "string" ? Number(element) : element;
  });

  const even = sortedData.filter((item) => item % 2 == 0);
  const odd = sortedData.filter((item) => item % 2 != 0);

  return (
    <div>
      <button className="w-full" onClick={() => setQuestion1(!question1)}>
        Question Number 1
        <br />
        <div className="font-thin">
          Storing input textbox value into an array, displaying the separate
          Even Array and Odd Array using Javascript
        </div>
      </button>
      <div>
        {question1 && (
          <div>
            <h2>Task One</h2>
            <h4>
              Storing input textbox value into an array, displaying the separate
              Even Array and Odd Array using Javascript
            </h4>
            <label htmlFor="header">Task Value *</label>
            <input
              id="header"
              name="header"
              className="border"
              type="number"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <div className="text-red-600">{error1 ? <>{error1}</> : null}</div>
            <button onClick={handleSubmit}>Submit</button>
            <div className="flex">
              <div className="border p-4">
                <h2>Even Number</h2>
                <hr />
                {even &&
                  even.map((item, index) => {
                    return (
                      <>
                        <li key={index}>{item}</li>
                      </>
                    );
                  })}
              </div>
              <div className="border p-4 ml-3">
                <h2>Odd Number</h2>
                <hr />
                {odd &&
                  odd.map((item, index) => {
                    return (
                      <>
                        <li key={index}>{item}</li>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default One;
