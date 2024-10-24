import React, { useState } from "react";

const Four = () => {
  const [error, setError] = useState({});
  const [toggle, setToggle] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productNameArr, setProductNameArr] = useState([]);
  const [productPriceArr, setProductPriceArr] = useState([]);

  console.log(productNameArr);
  console.log(productPriceArr);
  const handleSubmit = () => {
    const error = {};
    if (!productName) {
      error.productName = "The Product Name field is required.";
    } else if (!productPrice) {
      error.productPrice = "The Product Price field is required.";
    } else {
      setProductPriceArr([...productPriceArr, productPrice]);
      setProductNameArr([...productNameArr, productName]);
      setProductName("");
      setProductPrice("");
    }
    setError(error);
  };

  const price = productPriceArr.map((element) => {
    return typeof element === "string" ? Number(element) : element;
  });
  const totalPrice = price.reduce((accu, item) => {
    return Number(accu) + item;
  }, []);
  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Question Number 4</button>
      <h2>Task Four</h2>
      <h3>
        Storing the input data with Product Name and Product Price as an object
        into array, displaying that list data, calculating total Product Price
        using javascript.
      </h3>
      <div>
        <div>
          <label htmlFor="product_name">Product Name *</label>
        </div>
        <div>
          <input
            className="border"
            type="text"
            id="product_name"
            name="name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>{error ? <>{error.productName}</> : null}</div>
      </div>

      <div>
        <div>
          <label htmlFor="product_price">Product Price *</label>
        </div>
        <div>
          <input
            className="border"
            type="text"
            id="product_price"
            name="price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div>{error ? <>{error.productPrice}</> : null}</div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h2>Output Result:</h2>
        <div className="flex">
          <div className="border p-4">
            <h3>Sale Price</h3>
            <hr />
            {productNameArr.map((item) => {
              return (
                <>
                  {price.map((itemPrice, index) => {
                    return (
                      <>
                        <li key={index}>
                          {item}-{itemPrice}
                        </li>
                      </>
                    );
                  })}
                </>
              );
            })}
          </div>
          <div className="border p-4">
            <h3>Total Price</h3>
            <hr />
            {totalPrice ? <>{totalPrice}</> : <>Initial Price is 0</>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Four;
