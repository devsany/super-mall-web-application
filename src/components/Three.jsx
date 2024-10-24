import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Three = () => {
  const [data, setData] = useState("");
  const [item, setItem] = useState([]);
  const [error, setError] = useState({});
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    const error = {};
    if (!data) {
      error.one = "The Sale Price field is required.";
    } else if (Number(data) > 300) {
      error.two = "The Sale Price field must be less than or equal to 300";
    } else if (Number(data) <= 100) {
      error.three =
        "The Sale Price field must be greater than or eqaul to 100.";
    } else {
      setItem([...item, data]);
      setData("");
    }
    setError(error);
  };
  const sortedData = item.map((element) => {
    return typeof element == "string" ? Number(element) : element;
  });
  const totalSold = sortedData.reduce((accu, item) => {
    return Number(accu) + item;
  }, []);
  return (
    <div>
      <button className="w-full" onClick={() => setToggle(!toggle)}>
        Question number 3 <br />
        <div className="font-thin">
          Storing input textbox value into an array, displaying that array list,
          then calculating total sale price & total profit using Javascript
        </div>
      </button>
      {toggle ? (
        <>
          <h2>Task Three</h2>
          <h3>
            Storing input textbox value into an array, displaying that array
            list, then calculating total sale price & total profit using
            Javascript
          </h3>
          <h3>Product Original Price: 100</h3>
          <label htmlFor="name">Sale Price *</label>
          <input
            className="border"
            type="text"
            id="name"
            name="name"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <div className="text-red-600">
            {error && error.one ? <>{error.one}</> : null}
            {error && error.two ? <>{error.two}</> : null}
            {error && error.three ? <>{error.three}</> : null}
          </div>
          <button onClick={handleClick}>Submit</button>
          <div>
            <h2>Output Result:</h2>
          </div>
          <div className="flex">
            <div className="border p-4">
              <div></div>
              <h2>Sold Price List</h2>
              <hr />
              <div>{totalSold}</div>
            </div>
            <div className="border ml-2 mr-2 p-4">
              <h2>Total Sold Price</h2>
              <hr />
              <div>
                {sortedData &&
                  sortedData.map((item, index) => {
                    return (
                      <>
                        <li key={index}>{item}</li>
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="border p-4">
              <h2>Total Profit</h2>
              <hr />
              <div>
                {sortedData &&
                  sortedData.map((item, index) => {
                    return (
                      <>
                        <li key={index}>{item - 100}</li>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Three;
