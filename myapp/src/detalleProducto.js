import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating';
import styles from './css/detalleProducto.module.css';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';
import { useCart } from './cartContext';
import { getProductosRelacionados } from './api';
import ProductosRecomendados from './productosRecomendados';
import QuantitySelector from './quantity';

const DetalleProducto = () => {
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/productos/${id}/`)
      .then(response => {
        setProducto(response.data);
        setRating(response.data.calificacion_promedio);
        return getProductosRelacionados(id);
      })
      .then(response => {
        setProductosRelacionados(response); // Establece el estado con los datos obtenidos
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    // Enviar calificación a la API
    axios.post(`http://127.0.0.1:8000/api/productos/${id}/calificar/`, {
      calificacion: newRating
    }).then(response => {
      setProducto(prevProducto => ({
        ...prevProducto,
        calificacion_promedio: response.data.calificacion_promedio
      }));
    }).catch(error => {
      console.error('Error al enviar la calificación:', error);
    });
  };

  const handleAddToCart = () => {
    if (producto && cantidad > 0) {
      const productWithQuantity = { ...producto, quantity: cantidad };
      addToCart(productWithQuantity);

      Swal.fire({
        icon: 'success',
        title: '¡Añadido al carrito!',
        text: `Has añadido ${cantidad} ${producto.nombre} al carrito.`,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, selecciona una cantidad válida.',
      });
    }
  };

  const formatPrice = (price) => {
    // Asegurarse de que el precio es un número
    const numericPrice = parseFloat(price);
    return numericPrice.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const formatRating = (rating) => {
    const numericRating = parseFloat(rating);
    if (isNaN(numericRating)) {
      return 'No disponible'; // Si la calificación no es válida o es null
    }
    return numericRating.toFixed(1); // Devuelve la calificación formateada con un decimal
  };

  const calculateDiscount = (originalPrice, discountedPrice) => {
    const original = parseFloat(originalPrice);
    const discounted = parseFloat(discountedPrice);
    if (isNaN(original) || isNaN(discounted) || original === 0) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  if (!producto) return <p>Cargando...</p>;

  const originalPrice = producto.precio || 0;
  const discountedPrice = producto.precio_final || originalPrice;
  const discountPercentage = producto.en_oferta ? calculateDiscount(originalPrice, discountedPrice) : 0;

  return (
    <div>
      <BarraPrincipal />
      <div className={styles.detalleProductoContainer}>
        <div className={styles.columnaImagen}>
          {producto.en_oferta && (
            <div className={styles.cuadroDescuento}>
              {discountPercentage}% OFF
            </div>
          )}
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className={styles.imgProducto}
          />
        </div>

        <div className={styles.columnaInfo}>
          <h2 className={styles.productTitle}>{producto.nombre}</h2>
          <p className={styles.descripcion}>{producto.descripcion}</p>
          {producto.en_oferta ? (
            <div className={styles.precioContainer}>
              <h3 className={styles.precioDescuento}>{formatPrice(discountedPrice)}</h3>
              <h4 className={styles.precioOriginal}>{formatPrice(originalPrice)}</h4>
            </div>
          ) : (
            <h3 className={`text-success fw-bold ${styles.precio}`}>{formatPrice(originalPrice)}</h3>
          )}

          {producto.categoria && (
            <p className={styles.categoria}>Categoría: {producto.categoria.nombre}</p>
          )}

          <div className={styles.ratingContainer}>
            <Rating 
              onClick={handleRatingChange}
              ratingValue={rating}
              size={26}
              fillColor="orange"
              emptyColor="gray"
            />
            <span className={styles.ratingText}>{formatRating(producto.calificacion_promedio)}</span>
          </div>

          <div className={styles.quantitySelector}>
            <QuantitySelector cantidad={cantidad} setCantidad={setCantidad} />
          </div>
          <div className={styles.containerButton}>
            <button
              className={styles.addCartBtn}
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
      <div className={styles.productosRelacionados}>
        <ProductosRecomendados productos={productosRelacionados} />
      </div>
      <Footer />
    </div>
  );
};


export default DetalleProducto;
