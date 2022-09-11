import { Routes, Route } from "react-router-dom";
import { Signup } from "../pages/signup";
import { Signin } from "../pages/signin";
import {
  Country,
  Details,
  Payment,
  Product,
  Provider,
} from "../pages/products";
import { History } from "../pages/history";

import "./../App.css";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/products" element={<Country />} />
      <Route path="/products/provider" element={<Provider />} />
      <Route path="/products/product" element={<Product />} />
      <Route path="/products/details" element={<Details />} />
      <Route path="/products/payment" element={<Payment />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
};

export default AppRouter;
