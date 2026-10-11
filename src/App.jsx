import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'

import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Science from './pages/Science/Science'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import CheckoutSuccess from './pages/Checkout/CheckoutSuccess'
import Contact from './pages/Contact/Contact'
import FAQ from './pages/FAQ/FAQ'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import Terms from './pages/Terms/Terms'

import AdminLogin from './pages/admin/AdminLogin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders/AdminOrders'
import AdminSettings from './pages/admin/AdminSettings/AdminSettings'

import './App.css'

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="page-body">{children}</main>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <div className="state-message" style={{ paddingTop: '10rem' }}>
      <h1 className="shiny-gold-text heading-lg">404</h1>
      <p>Page not found.</p>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
          <Route path="/products/:slug" element={<PublicLayout><ProductDetail /></PublicLayout>} />
          <Route path="/science" element={<PublicLayout><Science /></PublicLayout>} />
          <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
          <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
          <Route path="/checkout/success" element={<PublicLayout><CheckoutSuccess /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
          <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}
