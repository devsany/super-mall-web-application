import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import app from "../../firebase/firebaseconsole";

const AdminViewShopID = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  console.log(id);
  const fetchData = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, "mall/shops");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      console.log(Object.values(snapshot.val())[id]);
      setData(Object.values(snapshot.val())[id]);
    } else {
      alert("data is not found");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <div>{data.shopName}</div>
        <div>{data.shopFloor}</div>
        <div>{data.shopNumber}</div>
        <div>{data.shopType}</div>
        <div>Offer Category</div>
        <div>Offer yet</div>
        <NavLink to={`/admin/view/offer/${id}`}>Add offer</NavLink>
      </div>
    </div>
  );
};

export default AdminViewShopID;
