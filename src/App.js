import Nav from "./components/Nav";
import Groups from "./routes/Groups";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Wishlist from "./routes/Wishlist";
import Register from "./routes/Register";
import ErrorPage from "./routes/ErrorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
