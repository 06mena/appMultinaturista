import React, { useState } from 'react';
import styles from './css/sortOptions.module.css'

const SortOptions = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState('relevance');

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    onSortChange(selectedOption);
  };

  return (
    <div className={styles.sortContainer}>
      <label htmlFor="sort" className={styles.label}>Ordenar por: </label>
      <select id="sort" value={sortOption} onChange={handleSortChange} className={styles.select}>
        <option value="relevance">Relevancia</option>
        <option value="price-asc">Precio: Bajo a Alto</option>
        <option value="price-desc">Precio: Alto a Bajo</option>
        {/* <option value="best-seller">Más Vendidos</option> */}
        <option value="name-asc">Nombre: A-Z</option>
        <option value="name-desc">Nombre: Z-A</option>
        {/* <option value="newest">Nuevos Productos</option> */}
        <option value="discount">Mayor Descuento</option> 
      </select>
    </div>
  );
};

export default SortOptions;
