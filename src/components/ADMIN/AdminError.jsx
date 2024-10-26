import { useNavigate } from "react-router-dom";

const AdminError = () => {
  const nav = useNavigate();
  const handleSubmit = () => {
    nav("/admin_login");
    console.log("error");
  };
  return (
    <div>
      <div className="flex h-[100vh] w-full justify-center items-center">
        <button onClick={handleSubmit}>Back</button>
        Admin Login Error
      </div>
    </div>
  );
};

export default AdminError;
