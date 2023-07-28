
import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import './App.css'
// import Home from '../src/components/main/Home';
// import Categories from '../src/components/main/Categories';
// import ContactUs from '../src/components/main/ContactUs';
import Products from '../src/components/main/Products';
import Navbar from '../src/components/navbar/Navbar';
import SignUp from '../src/components/main/SignUp';
import CartIcon from './components/main/CartIcon';
import ProductTable from './features/products/components';
// import UserTable from './features/users/components';
// import OrdersTable from './features/orders/components';
import Sidebar from './components/admin/Sidebar';
// import UserReview from './components/admin/UserReview';
import Cart from './components/main/Cart';
import Checkoutform from './components/main/checkoutform';
import SampleHomePage from './components/main/SampleHomePage';
import ProductDetails from './components/main/ProductDetails';
// import Footer from './components/main/footer';
import NotFound from './components/NotFound';



const App = () => {
  return (
    <div>

        <BrowserRouter>
        <ConditionalNavbar />
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/products" element={<Products />} />
            {/* <Route path="/categories" element={<Categories />} /> */}
            {/* <Route path="/contactus" element={<ContactUs />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/carticon" element={<CartIcon />} />
            <Route path="/table" element={<ProductTable/>} />
            <Route path="/details" element={<ProductDetails/>} />
            <Route path="/" element={<SampleHomePage/>} />
            <Route path="/sidebar" element={<Sidebar/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkoutform" element={<Checkoutform/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
        {/* <CheckoutForm /> */}
        </BrowserRouter>
    </div>
  )
}
function ConditionalNavbar() {
  
  const location = useLocation();
  if (location.pathname === '/products') {
    return null;
  }
  return <Navbar />;
}

export default App