import { PrivateRoutes, IsLoggedIn } from "./routes/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WishlistRoute from "./routes/WishlistRoute";
import GroupsRoute from "./routes/GroupsRoute";
import ProfileRoute from "./routes/ProfileRoute";
import ItemsRoute from "./routes/ItemsRoute";
import RegisterRoute from "./routes/RegisterRoute";
import LoginRoute from "./routes/LoginRoute";
import ErrorRoute from "./routes/ErrorRoute";
import UsersRoute from "./routes/UsersRoute";
import SharedGroupsRoute from "./routes/SharedGroupsRoute";
import NotificationsRoute from "./routes/NotificationsRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/wishlist" element={<WishlistRoute />} />
          <Route path="/groups" element={<GroupsRoute />} />
          <Route path="/shared-groups" element={<SharedGroupsRoute />} />
          <Route path="/profile" element={<ProfileRoute />} />
          <Route path="/items" element={<ItemsRoute />} />
          <Route path="/users" element={<UsersRoute />} />
          <Route path="/notifications" element={<NotificationsRoute />} />
        </Route>
        <Route element={<IsLoggedIn />}>
          <Route path="/register" element={<RegisterRoute />} />
          <Route path="/" element={<LoginRoute />} />
        </Route>
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
