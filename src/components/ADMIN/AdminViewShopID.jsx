import { get, getDatabase, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import app from "../../firebase/firebaseconsole";

const AdminViewShopID = () => {
  const [data, setData] = useState({});

  const [shopkey, setShopKey] = useState("");
  const { id } = useParams();
  const nav = useNavigate();
  console.log(id);
  const fetchData = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, "mall/shops");
    const snapshot = await get(dataRef);
    const key = Object.keys(snapshot.val())[id];
    setShopKey(key);
    if (snapshot.exists()) {
      console.log(Object.values(snapshot.val())[id]);
      setData(Object.values(snapshot.val())[id]);
    } else {
      alert("data is not found");
    }
  };
  const handleDeleteOffer = (id) => {
    const mainArray = data.shopOffer.filter((_, index) => index !== id);
    if (shopkey) {
      const db = getDatabase(app);
      const dataRef = ref(db, `mall/shops/${shopkey}`);
      update(dataRef, {
        shopOffer: mainArray,
      })
        .then(() => {
          alert("offer remove successfully successfully!");
          window.location.reload();
        })
        .catch((error) => {
          alert("Error updating teacher:", error);
        });
    } else {
      alert("No teacher selected to update.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <button onClick={() => nav(`/admin/list_of_all_shop`)}>Back</button>
      <div>
        <div>Shop Name: {data.shopName}</div>
        <div>Shop Owner Name: {data.shopOwnerName}</div>
        <div>Shop Floor: {data.shopFloor}</div>
        <div>Shop Number: {data.shopNumber}</div>
        <div>Shop Type: {data.shopType}</div>
        <div>
          <div>Offer Catogery</div>
          <div>
            {" "}
            {data.shopOffer ? (
              <>
                {data.shopOffer.map((item, index) => {
                  return (
                    <>
                      <div key={index} className="border p-4 m-4">
                        <div>Offer Name :- {item.offerName}</div>
                        <div>Offer Description :- {item.offerDiscription}</div>
                        <div>Offer Original Price{item.offerOriginalPrice}</div>
                        <div>Offer Discount :- {item.offerDiscount}</div>
                        <div>
                          Offer Discount Price :- {item.offerDiscountPrice}
                        </div>
                        <div>Offer Release Date :- {item.offerReleaseDate}</div>
                        <div>Offer Expier Date :- {item.offerExpier}</div>
                        <div>
                          <button
                            onClick={() => {
                              handleDeleteOffer(index);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <>No offer Provided yet</>
            )}
          </div>{" "}
        </div>
        <NavLink to={`/admin/view/offer/${id}`}>Add offer</NavLink>
      </div>
    </div>
  );
};

export default AdminViewShopID;
