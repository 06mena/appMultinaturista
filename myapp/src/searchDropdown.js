import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/searchDrop.module.css';

const SearchDropdown = ({ searchResults, handleResultClick }) => {
  return (
    <div className={styles.dropdown}>
      {searchResults.length > 0 ? (
        searchResults.map(producto => (
          <div key={producto.id} className={styles.dropdownItem} onClick={handleResultClick}>
            {producto.en_oferta && (
              <div className={styles.offerTag}>
                <span>{Math.round(producto.porcentaje_descuento)}% OFF</span>
              </div>
            )}
            <Link to={`/productos/${producto.id}`} className={styles.dropdownLink}>
              <img 
                src={producto.imagen_url || 'https://via.placeholder.com/50'} 
                alt={producto.nombre} 
                className={styles.productImage}
              />
              <span>{producto.nombre}</span>
            </Link>
          </div>
        ))
      ) : (
        <div className={styles.noResults}>
          <span>Producto no encontrado</span>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
