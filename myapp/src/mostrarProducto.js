import React, { useState } from 'react';
import styles from './css/mostrarProducto.module.css';
import ListarProductos from './listarProductos';
import BarraPrincipal from './barraPrincipal';
import SortOptions from './sortOptions';
import Paginacion from './paginacion';

const MostrarProducto = () => {
  const [sortOption, setSortOption] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 20;

  // Manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <BarraPrincipal />
      <div className={styles.container}>
        <h2 className={styles.tituloOfertas}>Productos</h2>
        {/* Opciones de ordenación */}
        <div className={styles.sortContainer}>
          <SortOptions sortOptions={sortOption} onSortChange={setSortOption} />
        </div>

        {/* Listar Productos */}
        <div className={styles.productListContainer}>
          <ListarProductos
            maxProductos={productosPorPagina}
            sortOption={sortOption}
            currentPage={currentPage}
          />
        </div>

        {/* Paginación */}
        <div className={styles.paginationContainer}>
          <Paginacion
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MostrarProducto;
