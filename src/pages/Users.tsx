
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const Users = () => {
  console.log("Redirecting to user management");
  
  useEffect(() => {
    console.log("Users redirect component mounted");
  }, []);
  
  return <Navigate to="/users/management" replace />;
};

export default Users;
