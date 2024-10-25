import React, { useState } from "react";

const Four = () => {
  const [error, setError] = useState({});
  const [toggle, setToggle] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productPriceArr, setProductPriceArr] = useState([]);
  const [productNameArr, setProductNameArr] = useState([]);
  const [mainArr, setMainArr] = useState([]);

  const handleSubmit = () => {
    const error = {};
    if (!productName) {
      error.productName = "The Product Name field is required.";
    } else if (!productPrice) {
      error.productPrice = "The Product Price field is required.";
    } else {
      setProductPriceArr([...productPriceArr, productPrice]);
      setProductNameArr([...productNameArr, productName]);
      setMainArr([
        ...mainArr,
        { proName: productName, proPrice: productPrice },
      ]);
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
      <button className="w-full" onClick={() => setToggle(!toggle)}>
        Question Number 4 <br />
        <div className="font-thin">
          Storing the input data with Product Name and Product Price as an
          object into array, displaying that list data, calculating total
          Product Price using javascript.
        </div>
      </button>
      {toggle && (
        <>
          <h2>Task Four</h2>
          <h3>
            Storing the input data with Product Name and Product Price as an
            object into array, displaying that list data, calculating total
            Product Price using javascript.
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
                {mainArr.map((item) => {
                  return (
                    <>
                      <li>
                        {item.proName} - {item.proPrice}
                      </li>
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
        </>
      )}
    </div>
  );
};

export default Four;
