import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './css/listarProductos.module.css';
import { CartContext } from './cartContext';
import CartDrawer from './cartDrawer';
import ProductCard from './productCard';

const ListarProductos = ({  productos: productosProp = [], limit, isHome }) => {
  const [productos, setProductos] = useState([]);
  const { addToCart, cart, removeFromCart } = useContext(CartContext);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/productos');
        // Filtrar productos activos
        const productosActivos = response.data.filter(producto => producto.estado === 'Activo');
        setProductos(productosActivos);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  // Función para mezclar los productos aleatoriamente
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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

  // Calcular el subtotal del carrito
  const cartSubtotal = cart.reduce((total, item) => total + (item.precio * item.quantity), 0);

  let displayedProductos = productosProp && productosProp.length > 0 ? productosProp : productos;

  // Si estamos en el home, mezclamos los productos y limitamos a 3
  if (isHome && displayedProductos.length > 0) {
    displayedProductos = shuffleArray([...displayedProductos]).slice(0, 3);
  } else if (limit) {
    // Si hay un límite (para otras vistas), aplicamos limitación sin mezclar
    displayedProductos = displayedProductos.slice(0, limit);
  }

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

export default ListarProductos;
