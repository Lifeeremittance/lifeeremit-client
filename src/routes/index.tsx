import { Routes, Route } from "react-router-dom";
import { Signup } from "../pages/signup";
import { Signin } from "../pages/signin";
import { Country } from "../pages/products";

import "./../App.css";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/products/country" element={<Country />} />
    </Routes>
  );
};

export default AppRouter;
