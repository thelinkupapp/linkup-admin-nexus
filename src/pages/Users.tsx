
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const Users = () => {
  useEffect(() => {
    console.log("Users redirect component mounted");
    // Log that we're about to redirect
    console.log("Redirecting to user management");
  }, []);
  
  return <Navigate to="/users/management" replace />;
};

export default Users;
