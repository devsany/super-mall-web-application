// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseconsole";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (!user) {
        nav("/adminlogin"); // Redirect to login if not authenticated
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [nav]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default AdminDashboard;
