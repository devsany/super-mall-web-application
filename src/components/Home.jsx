import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase/firebaseconsole";
// import ImageUpload from "./ADMIN/UploadImage";

const Home = () => {
  const [inputField, setInputField] = useState("");
  const [mainCatgoriesData, setMainCategoriesData] = useState([]);
  const [data, setData] = useState([]);
  const [offer, setOffer] = useState([]);
  console.log(data);
  const handleClick = () => {
    const categories = data.filter((item) => {
      return item.shopType === inputField;
    });
    setMainCategoriesData(categories);
    console.log(inputField);
  };
  const fetchData = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, "mall/shops");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      setData(Object.values(snapshot.val()));
    } else {
      alert("data is not found");
    }
  };
  const handleOfferProduct = () => {
    setOffer(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <div className="flex">
          <div>
            <select
              className="border cursor-pointer"
              name=""
              id=""
              onChange={(e) => setInputField(e.target.value)}
            >
              <option value="#">Select Catogery of shop</option>
              <option value="tech">Technology</option>
              <option value="veg">Vegitable</option>
              <option value="fruit">Fruit</option>
              <option value="cyber">Cyber Cafe</option>
              <option value="chicken">Chicken shop</option>
            </select>
          </div>
          <div>
            <button onClick={handleClick}>Submit</button>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 border rounded">
            {mainCatgoriesData.length > 0 ? (
              <>
                <table
                  // ref={tableRef}
                  className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Shop Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Shop Owner Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Shop Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Mall Floor
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Shop Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="transition-opacity duration-500">
                    {mainCatgoriesData.length > 0 ? (
                      <>
                        {mainCatgoriesData.map((item, index) => {
                          return (
                            <>
                              <tr
                                className="border-b-2  hover:bg-blue-100"
                                key={index}
                              >
                                <td className="px-6 text-center py-4">
                                  {index + 1}
                                </td>
                                <td className="px-6 py-4">{item.shopName}</td>
                                <td className="px-6 py-4">
                                  {item.shopOwnerName}
                                </td>
                                <td className="px-6 py-4">{item.shopNumber}</td>
                                <td className="px-6 py-4">{item.shopFloor}</td>
                                <td className="px-6 py-4">{item.shopType}</td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <div className="flex justify-center">
                        Data Not Abailable
                      </div>
                    )}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                {offer.length > 0 ? (
                  <>
                    {offer.map((item) => {
                      return (
                        <>
                          <div className="">
                            <div className="border ">
                              <h2>Shop Offer Detail</h2>
                              <div>Shop Number:{item.shopFloor}</div>
                              <div>Shop Name: {item.shopName}</div>
                              <div>
                                Offer:
                                {typeof item.shopOffer === "string" ? (
                                  <>No offer</>
                                ) : (
                                  <>
                                    {item.shopOffer.map((item, index) => {
                                      return (
                                        <>
                                          <div>{item.offerName}</div>
                                          <div>{item.offerDiscription}</div>
                                          <div>{item.offerReleaseDate}</div>
                                          <div>{item.offerDiscount}</div>
                                          <div>{item.offerExpier}</div>
                                          <div>{item.offerOriginalPrice}</div>
                                          <div>{item.offerDiscountPrice}</div>
                                        </>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>No Categories selected</>
                )}
              </>
            )}
          </div>
          <div className="col-span-2 border rounded">
            <button onClick={handleOfferProduct}>List offer Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
