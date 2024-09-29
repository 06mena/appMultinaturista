import React, { useState, useEffect } from 'react';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';
import ProductosOferta from './productosOferta';
import SortOptions from './sortOptions';
import Paginacion from './paginacion';
import axios from 'axios';
import styles from './css/productosOferta.module.css';

// organiza pagina ofertas

const OfertasMostrar = () => {
  const [sortOption, setSortOption] = useState('relevance');
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 20;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/productos-oferta/');
        const productosActivos = response.data.filter(producto => producto.estado === 'Activo');
        setProductos(productosActivos);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  // Ordenar productos según la opción seleccionada
  const sortProducts = (productos, sortOption) => {
    const sortedProducts = [...productos];
    switch (sortOption) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.precio - b.precio);
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.precio - a.precio);
      case 'name-asc':
        return sortedProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
      case 'name-desc':
        return sortedProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
      case 'discount':
        return sortedProducts.sort((a, b) => {
          const discountA = ((a.precio - a.precio_final) / a.precio) * 100;
          const discountB = ((b.precio - b.precio_final) / b.precio) * 100;
          return discountB - discountA;
        });
      default:
        return sortedProducts;
    }
  };

  // Productos ordenados en base a la opción seleccionada
  const sortedProductos = sortProducts(productos, sortOption);

  // Lógica de paginación
  const totalProductos = sortedProductos.length;
  const totalPages = Math.ceil(totalProductos / productosPorPagina);
  const startIndex = (currentPage - 1) * productosPorPagina;
  const selectedProducts = sortedProductos.slice(startIndex, startIndex + productosPorPagina);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <BarraPrincipal />
      <h2 className={styles.tituloRelacionado}>Ofertas</h2>
      <div className={styles.cajaOrdenar}>
        <SortOptions onSortChange={setSortOption} />
      </div>
      <ProductosOferta productos={selectedProducts} />
      <div className={styles.cajaPaginacion}>
        <Paginacion totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      <Footer />
    </div>
  )
}

export default OfertasMostrar