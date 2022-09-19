import { Outlet, Navigate } from "react-router-dom";

const token = localStorage.getItem("token");

export const PrivateRoutes = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};

// export const IsLoggedIn = () => {
//   return localStorage.getItem("token") ? (
//     <Navigate to="/wishlist" />
//   ) : (
//     <Outlet />
//   );
// };
