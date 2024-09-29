import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'; // Para capturar el slug desde la URL
import axios from 'axios';
import styles from './css/productosCategorias.module.css';
import CartDrawer from './cartDrawer';
import { CartContext } from './cartContext';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';
import ProductCard from './productCard';
import SortOptions from './sortOptions';
import Paginacion from './paginacion';
import MenuCategorias from './menuCategorias';

const ProductosPorCategoria = () => {
  const { id } = useParams(); // Captura el slug de la categoría desde la URL
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [sortOption, setSortOption] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart, cart, removeFromCart } = useContext(CartContext);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const productosPorPagina = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await axios.get(`http://127.0.0.1:8000/api/productos/?categoria=${id}`);
        const productosCategoria = productosResponse.data.filter(producto => producto.estado === 'Activo');
        setProductos(productosCategoria);

        // Obtener información de la categoría
        const categoriaResponse = await axios.get(`http://127.0.0.1:8000/api/categorias/${id}`);
        setCategoria(categoriaResponse.data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, [id]);// Se vuelve a ejecutar cada vez que el slug cambia

  // Ordenar productos según la opción seleccionada
  const sortProducts = (productos, sortOption) => {
    const sortedProducts = [...productos];
    switch (sortOption) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.precio - b.precio);
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.precio - a.precio);
      case 'best-seller':
        return sortedProducts.sort((a, b) => b.sold - a.sold);
      case 'name-asc':
        return sortedProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
      case 'name-desc':
        return sortedProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
      case 'newest':
        return sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'discount':
        return sortedProducts.sort((a, b) => {
          const discountA = ((a.precio - a.precio_final) / a.precio) * 100;
          const discountB = ((b.precio - b.precio_final) / b.precio) * 100;
          return discountB - discountA;
        });
      case 'relevance':
        return sortedProducts.sort((a, b) => b.relevance - a.relevance);
      default:
        return sortedProducts;
    }
  };

  const sortedProductos = sortProducts(productos, sortOption);

  // Lógica de paginación
  const totalProductos = sortedProductos.length;
  const totalPages = Math.ceil(totalProductos / productosPorPagina);
  const startIndex = (currentPage - 1) * productosPorPagina;
  const selectedProducts = sortedProductos.slice(startIndex, startIndex + productosPorPagina);

  const handleAddToCart = (product) => {
    const productoConDescuento = {
      ...product,
      precio: product.precio,
      precio_final: product.en_oferta && product.precio_final && !isNaN(product.precio_final)
        ? product.precio_final
        : product.precio,
    };
    addToCart(productoConDescuento);
    setIsCartDrawerOpen(true);
  };

  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const cartSubtotal = cart.reduce((total, item) => total + (item.precio * item.quantity), 0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <BarraPrincipal />
      <div className={styles.containerGrande}>
        <div className={styles.containerMenuCategorias}>
          <MenuCategorias />
        </div>
        <div className={styles.container}>
          <div className={styles.productosSection}>
            <h2 className={styles.tituloCategoria}>{categoria ? categoria.nombre : 'Categoría'}</h2>
            <div className={styles.cajaOrdenar}>
              <SortOptions sortOptions={sortOption} onSortChange={setSortOption} />
            </div>
            <div className={styles.row}>
              {selectedProducts.length > 0 ? (
                selectedProducts.map(produ => (
                  <ProductCard
                    key={produ.id}
                    producto={produ}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <p>No hay productos disponibles en la categoría seleccionada.</p>
              )}
            </div>
            <CartDrawer
              isOpen={isCartDrawerOpen}
              onClose={closeCartDrawer}
              cart={cart}
              onRemoveFromCart={handleRemoveFromCart}
              subtotal={cartSubtotal}
            />
            <Paginacion totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductosPorCategoria;