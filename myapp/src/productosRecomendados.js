import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from './css/productosRecomendados.module.css';
import { CartContext } from './cartContext';
import ProductCard from './productCard';

const ProductosRecomendados = ({ productos, maxProductos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3); // Valor por defecto
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 992) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llamar a la función para establecer el valor inicial

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = (produ) => {
    addToCart(produ);
    Swal.fire({
      title: 'Producto agregado',
      text: `${produ.nombre} se ha agregado al carrito.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  if (productos.length === 0) {
    return <p>No hay productos relacionados disponibles.</p>;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + productos.length) % productos.length);
  };

  return (
    <div className={styles.recomendadosContainer}>
      <h2 className={styles.tituloRelacionado}>Productos Relacionados</h2>
      <div className={styles.carousel}>
        <button className={styles.prevButton} onClick={prevSlide}>‹</button>
        <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}>
          {productos.slice(0, maxProductos).map(producto => (
            <ProductCard
              key={producto.id}
              producto={producto}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <button className={styles.nextButton} onClick={nextSlide}>›</button>
      </div>
    </div>
  );
};

export default ProductosRecomendados;
