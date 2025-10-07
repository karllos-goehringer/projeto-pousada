import { Navigate, Outlet } from "react-router-dom";
import { verifyLogin } from "../exec";
import LocalStorage from "../LocalStorage";


export default function PrivateRoute() {
if (LocalStorage.UserLogged != null) { 
     const isLogged = verifyLogin(LocalStorage.UserLogged);
  if (!isLogged) {
    return <Navigate to="/home" replace/>;
  }
}
  return <Outlet />;
}