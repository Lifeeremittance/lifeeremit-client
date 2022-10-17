import { Routes, Route } from "react-router-dom";
import { Signup } from "../pages/signup";
import { Signin, Verify } from "../pages/signin";
import {
  Country,
  Details,
  Payment,
  Product,
  Provider,
} from "../pages/products";
import { History } from "../pages/history";
import { Edit } from "../pages/edit";
import { Landing } from "../pages/landing";

import "./../App.css";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/products" element={<Country />} />
      <Route path="/products/provider" element={<Provider />} />
      <Route path="/products/product" element={<Product />} />
      <Route path="/products/details" element={<Details />} />
      <Route path="/products/payment/:id" element={<Payment />} />
      <Route path="/history" element={<History />} />
      <Route path="/edit" element={<Edit />} />
    </Routes>
  );
};

export default AppRouter;
