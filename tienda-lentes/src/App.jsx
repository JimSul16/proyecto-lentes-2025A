import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from "./components/pages/Home.jsx";
import Cart from "./components/pages/Cart.jsx";
import ProductDetail from "./components/pages/ProductDetail.jsx";
import ProductsPage from "./components/products/ProductsPage.jsx";
import BrandsPage from "./components/pages/BrandsPage.jsx";
import Login from "./components/pages/Login.jsx";
import './index.css';
import Checkout from './components/pages/Checkout.jsx';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="products" element={<ProductsPage />} /> {}
            <Route path="brands" element={<BrandsPage />} /> {}
            <Route path="brands" element={<BrandsPage />} />
            <Route path="login" element={<Login />} />
            <Route path="checkout" element={<Checkout />} />

          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
