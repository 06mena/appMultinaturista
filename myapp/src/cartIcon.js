import React from 'react';
import { Link } from 'react-router-dom';
import { RiShoppingBasketLine } from "react-icons/ri";
import styles from './css/barraPrincipal.module.css'

const CartIcon = ({ totalItems }) => {
  return (
    <Link to="/carrito" className={`${styles.carritoContainer} btn carrito-btn position-relative`}>
      <RiShoppingBasketLine size={24} className={styles.carrito} />
      {totalItems > 0 && (
        <span className={`${styles.badge} position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}>
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
