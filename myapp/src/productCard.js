import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/productosOferta.module.css';

const ProductCard = ({ producto, handleAddToCart }) => {
  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return 'Precio no disponible';
    return numericPrice.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const calculateDiscount = (originalPrice, discountedPrice) => {
    const original = parseFloat(originalPrice);
    const discounted = parseFloat(discountedPrice);
    if (isNaN(original) || isNaN(discounted) || original === 0) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  const originalPrice = producto.precio || 0;
  const discountedPrice = producto.precio_final || originalPrice;
  const discountPercentage = calculateDiscount(originalPrice, discountedPrice);

  return (
    <div className={styles.cardProducto}>
      {producto.en_oferta && (
        <div className={styles.offerTag}>
          <span>{discountPercentage}% OFF</span>
        </div>
      )}
      <Link to={`/productos/${producto.id}`}>
        <img src={producto.imagen_url} className={styles.cardImg} alt={producto.nombre} />
      </Link>
      <div className={styles.cardBody}>
        <Link to={`/productos/${producto.id}`} className={styles.cardText}>
          {producto.nombre}
        </Link>
        <div className={styles.priceContainer}>
          {producto.en_oferta ? (
            <>
              <p className={styles.cardPriceOriginal}>
                <del>{formatPrice(producto.precio)}</del>
              </p>
              <p className={styles.cardPrecio}>{formatPrice(producto.precio_final)}</p>
            </>
          ) : (
            // Si no está en oferta, mostrar el precio en verde
            <p className={styles.cardPrecioVerde}>{formatPrice(originalPrice)}</p>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.botonOferta} onClick={() => handleAddToCart(producto)}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
