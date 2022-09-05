import GroupsPage from "./routes/GroupsPage";
import LoginPage from "./routes/LoginPage";
import ProfilePage from "./routes/ProfilePage";
import WishlistPage from "./routes/WishlistPage";
import RegisterPage from "./routes/RegisterPage";
import ErrorPage from "./routes/ErrorPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
