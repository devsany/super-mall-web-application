import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../../firebase/firebaseconsole";

import { db } from "../../firebase/firebaseconsole";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [admin, setAdmin] = useState([]);
  const [adminID, setAdminID] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState({});

  console.log(auth?.currentUser?.photoURL);
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("error happened", error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("error happened", error);
    }
  };
  const Logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("error happened", error);
    }
  };

  const adminData = collection(db, "admin");
  const getAdminList = async () => {
    //READ THE DATA BASE
    //SET THE MOVIE LIST
    try {
      const data = await getDocs(adminData);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setAdmin(filteredData);
    } catch (error) {
      console.error(error);
    }
  };
  const addData = async () => {
    console.log(name, adminEmail, role);
    try {
      await addDoc(movieCollection, {
        email: adminEmail,
        name: name,
        role: role,
      });
      getAdminList();
      return <>thank you</>;
    } catch (error) {
      console.error(error);
    }
  };
  const deleteData = async (id) => {
    const data = doc(db, "admin", id);
    await deleteDoc(data);
    getAdminList();
  };
  const nav = useNavigate();
  const handleAdminSubmit = () => {
    const error = {};
    if (!adminID) {
      error.adminID = "Require";
    } else if (!password) {
      error.password = "Require";
    } else {
      if (
        admin[0].adminUserID === adminID &&
        admin[0].adminPassword === password
      ) {
        nav("/admin");
      } else {
        return nav("/admin_error");
      }
    }
    setError(error);
  };
  useEffect(() => {
    getAdminList();
  }, []);
  return (
    <div className="w-full font-mono text-md h-[90vh] flex justify-center items-center">
      <div className="border p-10">
        <div className="p-3">
          <div className=" font-bold">
            <label htmlFor="adminId">Enter Admin ID*</label>
          </div>
          <input
            type="text"
            className="text-sm h-8 font-bold pl-2 border rounded-md"
            value={adminID}
            placeholder="Enter admin ID"
            onChange={(e) => setAdminID(e.target.value)}
            required
          />
          <div className="text-red-500 font-mono font-sm font-bold">
            {error.adminID ? <>{error.adminID}</> : null}
          </div>
        </div>
        <div className="p-3">
          <div className="font-bold">
            <label htmlFor="adminPassword">Enter Admin Password*</label>
          </div>
          <input
            type="password"
            className="text-sm h-8 font-bold pl-2 border rounded-md"
            value={password}
            placeholder="enter your email"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-red-500 font-mono font-sm font-bold ">
            {error.password ? <>{error.password}</> : null}
          </div>
        </div>
        <button onClick={handleAdminSubmit}>Submit</button>
      </div>
      {/* <button onClick={signIn}>SignIn</button>
      <button onClick={signInWithGoogle}>Sign in With google</button>
      <button onClick={Logout}>Log Out</button>
      <div>
        <input
          className="border"
          type="email"
          value={adminEmail}
          placeholder="Enter email"
          onChange={(e) => {
            setAdminEmail(e.target.value);
          }}
        />
        <input
          className="border"
          type="text"
          value={name}
          name=""
          id=""
          placeholder="Enter name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="border"
          type="text"
          value={role}
          placeholder="Enter role"
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />
        <button onClick={addData}>Submit</button>
      </div> */}
      {/* {movie.reverse().map((item, index) => (
        <>
          <div className="border p-3 m-2">
            <div>{index + 1}</div>
            <div>Id:{item.id}</div>
            <div>Email:{item.email}</div>
            <div>Name:{item.name}</div>
            <div>Role:{item.role}</div>
            <div>
              <button onClick={() => deleteData(item.id)}>Delete</button>
            </div>
          </div>
        </>
      ))} */}
    </div>
  );
};

export default AdminLogin;
