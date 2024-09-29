import React from 'react';
import { Offcanvas, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from './cartContext';
import Swal from 'sweetalert2';
import styles from './css/cartDrawer.module.css'; // Asegúrate de que este archivo esté correctamente importado

const CartDrawer = ({ isOpen, onClose }) => {
  const { getSubtotal, groupCartItems, removeFromCart } = useCart();
  const groupedCart = groupCartItems();

  // Obtener el subtotal y manejar posibles valores no numéricos
  const subtotal = getSubtotal();
  const formattedSubtotal = (typeof subtotal === 'number' && !isNaN(subtotal))
    ? subtotal.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    : '0';

  const handleRemoveClick = (itemId, itemName) => {
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar producto',
      text: `¿Estás seguro de que quieres eliminar ${itemName} del carrito?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(itemId);
        Swal.fire(
          'Eliminado',
          `${itemName} ha sido eliminado del carrito.`,
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

  return (
    <Offcanvas show={isOpen} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ color: '#0B513B', fontSize: '27px' }}>Carrito de Compras</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {groupedCart.length > 0 ? (
          <>
            {groupedCart.map((item) => {

              return (
                <div key={item.id} className={`d-flex align-items-center mb-3 ${styles.carritoItemDiscount}`}>
                  <Image src={item.imagen_url} thumbnail style={{ width: '80px', height: '80px' }} />
                  <div className="ms-3 w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Link to={`/productos/${item.id}`} className={styles.nombreProducto}>
                          <h5>{item.nombre}</h5>
                        </Link>
                        <div className={styles.priceContainer}>
                          {item.en_oferta ? (
                            <div className={styles.priceWrapper}>
                              <p className={styles.carritoItemPriceOriginal}>
                                {formatPrice(item.precio)}
                              </p>
                              <p className={styles.carritoItemPriceDiscount}>
                                {formatPrice(item.precio_final)}
                              </p>
                            </div>
                          ) : (
                            <p className={styles.carritoItemPriceVerde}>
                              {/* Mostrar solo el precio si no está en oferta */}
                              {formatPrice(item.precio)}
                            </p>
                          )}
                        </div>
                        <p>{item.quantity} x {item.en_oferta ? formatPrice(item.precio_final) : formatPrice(item.precio)}</p>
                      </div>
                      <img
                        className={styles.cancelIcon}
                        onClick={() => handleRemoveClick(item.id, item.nombre)}
                        src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1725542587/cancelarIcono_ybkx6w.png"
                        alt="Eliminar"
                      />
                    </div>
                  </div>
                </div>
              );

            })}
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Subtotal:</h5>
              <h5>{formattedSubtotal}</h5>
            </div>
            <div className="d-flex flex-column gap-2 mt-4">
              <Link to="/carrito" className={`btn ${styles.btnCarrito}`}>
                Ver carrito
              </Link>
              <Link to="/carrito/checkout" className={`btn ${styles.btnPrimary}`}>
                Finalizar compra
              </Link>
            </div>
          </>
        ) : (
          <p>No hay productos en el carrito</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartDrawer;
