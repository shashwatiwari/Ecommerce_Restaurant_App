import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";
import Home from "./scenes/Home";
import Menu from "./scenes/Menu";
import Search from "./scenes/Search";
import Categories from "./scenes/Categories";
import Category from "./scenes/Category";
import Food from "./scenes/Food";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from './CartContext';
import LoginForm from './user/LoginForm';
import SignUpForm from './user/SignUpForm';
import ContactUsForm from "./user/ContactUs";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";

function App() {
  const Navigate = useNavigate();
  return (
    <CartProvider >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        {/* main menu and single menu */}
        <Route path="/menu/:id" element={<Food />} />
        <Route path="/categories" element={<Categories />} />
        {/* main category and category type */}
        <Route path="/categories/:category" element={<Category />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/contact" element={<ContactUsForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </CartProvider>

  );
}

export default App;
