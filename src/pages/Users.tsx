
import { Navigate } from "react-router-dom";

const Users = () => {
  console.log("Redirecting to user management");
  return <Navigate to="/users/management" replace />;
};

export default Users;
