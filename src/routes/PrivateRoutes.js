import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
  // const token = localStorage.getItem("token");
  // let auth = { token };
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};

export const IsLoggedIn = () => {
  return localStorage.getItem("token") ? (
    <Navigate to="/wishlist" />
  ) : (
    <Outlet />
  );
};
