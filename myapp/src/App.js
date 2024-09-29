import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './cartContext';
import { AuthProvider } from './authContext'; // Proveedor para autenticación
import ProtectedRoute from './protectedRoute'; // Ruta protegida
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';


// Importar todos los componentes
import Home from './home';
import Nosotros from './nosotros';
import Carrito from './carrito';
import Checkout from './finalizarCompra';
import DetalleProducto from './detalleProducto';
import Login from './login';
import ShippingPolicy from './shippingPolicy';
import Contacto from './contacto';
import Ofertas from './ofertasMostrar';
import ProductosCategorias from './productosCategorias';
import BarrasAdmin from './barrasAdmin';
import ListarProductos from './mostrarProductos';

function App() {
  return (
    <AuthProvider> {/* Proveedor de autenticación para el admin */}
      <CartProvider> {/* Proveedor del carrito de compras */}
        <Router>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/productos/:id" element={<DetalleProducto />} />
            <Route path="/carrito/checkout" element={<Checkout />} />
            <Route path="/carrito/checkout/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/categoria/:id" element={<ProductosCategorias />} />
            <Route path="/productosLista" element={<ListarProductos/>} />

            {/* Rutas Protegidas para el Admin */}
            <Route path="/loginAdmin" element={<Login />} />
            <Route path="/Admin" element={
              <ProtectedRoute> {/* Solo accesible para el administrador */}
                <BarrasAdmin />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
