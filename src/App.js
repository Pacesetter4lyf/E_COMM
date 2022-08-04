import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShoppingCart from "./Components/ShoppingCart";
import ContactInfo from "./Screens/ContactInfo";
import Error from "./Screens/Error";
import Login from "./Screens/Login";
import OrderCompleted from "./Screens/OrderCompleted";
import ProductDetails from "./Screens/ProductDetails";
import Products from "./Screens/Products";
import Register from "./Screens/Register";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "react-use-cart";
import Home from "./Screens/Home";
// import Prod from "./Components/Featured";

function App() {
  return (
    <CartProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:prod_id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/completed" element={<OrderCompleted />} />
            <Route path="/error" element={<Error />} />
            <Route path="/contact" element={<ContactInfo />} />
            {/* <Route path="/p" element={<Prod />} /> */}
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </CartProvider>
  );
}

export default App;
