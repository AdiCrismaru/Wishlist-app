import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotificationsRoute from "./routes/NotificationsRoute";
import SharedGroupsRoute from "./routes/SharedGroupsRoute";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import RegisterRoute from "./routes/RegisterRoute";
import WishlistRoute from "./routes/WishlistRoute";
import ProfileRoute from "./routes/ProfileRoute";
import GroupsRoute from "./routes/GroupsRoute";
import ItemsRoute from "./routes/ItemsRoute";
import LoginRoute from "./routes/LoginRoute";
import ErrorRoute from "./routes/ErrorRoute";
import UsersRoute from "./routes/UsersRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/notifications" element={<NotificationsRoute />} />
          <Route path="/shared-groups" element={<SharedGroupsRoute />} />
          <Route path="/wishlist" element={<WishlistRoute />} />
          <Route path="/profile" element={<ProfileRoute />} />
          <Route path="/groups" element={<GroupsRoute />} />
          <Route path="/items" element={<ItemsRoute />} />
          <Route path="/users" element={<UsersRoute />} />
        </Route>
        {/* <Route element={<IsLoggedIn />}> */}
        <Route path="/register" element={<RegisterRoute />} />
        <Route path="/" element={<LoginRoute />} />
        {/* </Route> */}
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
