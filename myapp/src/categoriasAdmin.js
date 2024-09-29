import styles from './css/categoriasAdmin.module.css';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CategoriasAdmin = ({ categoriaEnv }) => {
  const [categoriaC, setCategoriaC] = useState(null); // Info de la categoría
  const [productos, setProductos] = useState([]); // Productos almacenados que tengan categoría

  // Obtener la información de la categoría
  useEffect(() => {
    if (categoriaEnv) {
      axios.get(`http://127.0.0.1:8000/api/categorias/${categoriaEnv}`)
        .then(response => {
          setCategoriaC(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [categoriaEnv]);

  // Obtener los productos de la categoría
  useEffect(() => {
    if (categoriaEnv) {
      axios.get(`http://127.0.0.1:8000/api/productos/?categoria=${categoriaEnv}`)
        .then(response => {
          setProductos(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [categoriaEnv]);

  // Función para formatear el precio
  const formatPrice = (price) => {
    return price.toLocaleString(); // Esto añadirá comas según la configuración local
  };


  return (
    <div className={styles.cajaCategorias}>
      <h1>
        {categoriaC ? categoriaC.nombre : 'Cargando...'}
      </h1>

      {productos.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Descuento</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
            {productos.map(producto => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{categoriaC ? categoriaC.nombre : 'Desconocida'}</td>
                <td>${formatPrice(producto.precio)}</td>
                <td>{producto.precio_final ? `$${producto.precio_final}` : `Sin descuento`}</td>
                <td>{producto.stock}</td>
                <td>
                  <button style={{ fontSize: '25px', backgroundColor: 'transparent' }}>
                    <i className="bi bi-dash-square"></i>
                  </button>
                  <button style={{ fontSize: '25px', backgroundColor: 'transparent' }}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={`${styles.sinResultados}`}>
          <img src='https://res.cloudinary.com/dj1cegfhf/image/upload/v1726752260/caja-vacia_rbz5xt.jpg' alt='Sin resultados'></img>
          <strong>No hay productos asociados a esta categoría.</strong>
        </div>
      )}
    </div>
  );
};

export default CategoriasAdmin;
