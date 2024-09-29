import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styles from './css/productosOferta.module.css';
import { CartContext } from './cartContext';
import CartDrawer from './cartDrawer';
import ProductCard from './productCard';

const ProductosOferta = ({ productos: productosProp = [], limit, isHome }) => {
  const [productos, setProductos] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { addToCart, cart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/productos-oferta/');
        // Filtrar productos activos
        const productosActivos = response.data.filter(producto => producto.estado === 'Activo');
        setProductos(productosActivos);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleAddToCart = (product) => {
    const productoConDescuento = {
      ...product,
      precio: product.precio, // Siempre mantiene el precio original
      precio_final: product.en_oferta && product.precio_final && !isNaN(product.precio_final)
        ? product.precio_final
        : product.precio,
    };
    addToCart(productoConDescuento);
    setIsCartDrawerOpen(true);
  };

  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const cartSubtotal = cart.reduce((total, item) => total + (item.precio * item.quantity), 0);

  // Si limit está definido, corta los productos mostrados, si no, muestra todos
  const displayedProductos = limit
    ? (productosProp && productosProp.length > 0 ? productosProp.slice(0, limit) : productos.slice(0, limit))
    : (productosProp && productosProp.length > 0 ? productosProp : productos);

  if (!displayedProductos.length) {
    return <p>No hay productos en oferta disponibles.</p>;
  }

  return (
    <div className={isHome ? styles.productRow : styles.productGrid}>
      {displayedProductos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          handleAddToCart={handleAddToCart}
        />
      ))}

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={closeCartDrawer}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        subtotal={cartSubtotal}
      />
    </div>
  );
};

export default ProductosOferta;
