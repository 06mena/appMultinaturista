import React from 'react';
import styles from './css/quantitySelector.module.css';

const QuantitySelector = ({ cantidad, setCantidad }) => {
  const handleIncrease = () => {
    setCantidad(cantidad + 1);
  };

  const handleDecrease = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className={styles.quantitySelector}>
      <button className={styles.button} onClick={handleDecrease}>-</button>
      <span className={styles.quantity}>{cantidad}</span>
      <button className={styles.button} onClick={handleIncrease}>+</button>
    </div>
  );
};

export default QuantitySelector;
