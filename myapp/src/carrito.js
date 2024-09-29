import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './cartContext';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import styles from './css/carrito.module.css';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';
import CarritoVacio from './carritoVacio';

const Carrito = () => {
  const { updateQuantity, groupCartItems, removeFromCart, getTotal, getSubtotal } = useContext(CartContext);
  const navigate = useNavigate(); // Hook de React Router para la navegación programática

  const handleCheckoutClick = () => {
    if (groupCartItems().length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Carrito vacío',
        text: 'Tu carrito está vacío. Añade productos al carrito para continuar.',
      });
      return;
    }
    navigate('/carrito/checkout'); // Redirige a la página de checkout desde el carrito
  };

  const handleRemoveClick = (productId, productName) => {
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar producto',
      text: `¿Estás seguro de que quieres eliminar ${productName} del carrito?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId);
        Swal.fire(
          'Eliminado',
          `${productName} ha sido eliminado del carrito.`,
          'success'
        );
      }
    });
  };

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return numericPrice.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const groupedCart = groupCartItems();

  return (
    <div className={styles.carritoContainer}>
      <BarraPrincipal />
      <h2 className={styles.carritoTitle}><br />Carrito de Compras</h2>

      {groupedCart.length === 0 ? (
        <CarritoVacio/>
      ) : (
        <>
          <div className={styles.carritoContenedor}>
            <div className={styles.carritoColumnWrapper}>
              <div className={styles.carritoColumn}>
                <div className={styles.carritoHeader}>
                  <span className={styles.headerActions}></span>
                  <span className={styles.headerName}>Producto</span>
                  <span className={styles.headerPrice}>Precio</span>
                  <span className={styles.headerQuantity}>Cantidad</span>
                  <span className={styles.headerSubtotal}>Subtotal</span>
                </div>

                <ul className={styles.carritoList}>
                  {groupedCart.map(product => {
                    // Usar precio_final si está disponible, de lo contrario usar precio
                    const price = parseFloat(product.precio_final) || parseFloat(product.precio) || 0;
                    const subtotal = price * (product.quantity || 1);

                    return (
                      <li className={styles.carritoItem} key={product.id}>
                        <img 
                          className={styles.cancelIcon} 
                          onClick={() => handleRemoveClick(product.id, product.nombre)} 
                          src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1725542587/cancelarIcono_ybkx6w.png" 
                          alt="Eliminar" 
                        />
                        <span className={styles.carritoItemName}>{product.nombre}</span>
                        <span className={styles.carritoItemPrice}>{formatPrice(price)}</span>
                        <input 
                          type="number" 
                          className={styles.carritoItemQuantity} 
                          value={product.quantity || 1} 
                          onChange={(e) => updateQuantity(product.id, e.target.value)} 
                          min="1"
                        />
                        <span className={styles.carritoItemSubtotal}>{formatPrice(subtotal)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className={styles.carritoResumenWrapper}>
              <div className={styles.carritoResumen}>
                <h3>Resumen del Pedido</h3>
                <p>Total productos: {groupedCart.reduce((total, product) => total + (product.quantity || 1), 0)}</p>
                <p>Envio: {formatPrice(5000)}</p>
                <p>Subtotal: {formatPrice(getSubtotal())}</p>
                <p>Total: {formatPrice(getTotal())}</p>
                <button className={styles.carritoPagar} onClick={handleCheckoutClick}>
                  Finalizar compra
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Carrito;
