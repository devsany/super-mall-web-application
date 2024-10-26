import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { useEffect, useState } from "react";
  import { auth, googleProvider } from "../firebase/firebaseconsole";
  
  import { db } from "../firebase/firebaseconsole";
  import {
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  
  const AdminLogin = () => {
    const [movie, setMovie] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [role, setRole] = useState("");
  
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
  
    const movieCollection = collection(db, "admin");
    const getAdminList = async () => {
      //READ THE DATA BASE
      //SET THE MOVIE LIST
      try {
        const data = await getDocs(movieCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData);
        setMovie(filteredData);
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
    useEffect(() => {
      getAdminList();
    }, []);
    return (
      <div>
        <input
          type="password"
          className="border"
          placeholder="enter your email"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="email"
          className="border"
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
  
        <button onClick={signIn}>SignIn</button>
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
        </div>
        {movie.reverse().map((item, index) => (
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
        ))}
      </div>
    );
  };
  
  export default AdminLogin;
  