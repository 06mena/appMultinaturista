import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Usar Link para redireccionar
import axios from 'axios';
import styles from './css/menuCategorias.module.css';

const MenuCat = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/categorias/`)
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => console.error('Error al cargar las categorías:', error));
  }, []);


  return (
    < div >
      <div className={`container-fluid ${styles.containerMenu}`}>
        <div className={styles.containerCustom}>
          {/* Menú de navegación en la izquierda */}
          <nav className={`h-100 flex-column align-items-stretch ${styles.navbarCustom}`}>
            {/* Título Categorías */}
            <h2 className={styles.titleCustom}>Categorías</h2>
            <nav className="nav nav-pills flex-column">
              {categorias.map((categoria) => (
                <Link className={`nav-link ${styles.navLinkCustom}`} to={`/categoria/${categoria.id}`}>{categoria.nombre}</Link>
              ))} 
            </nav>
          </nav>
        </div>
      </div>
    </div >
  );
};

export default MenuCat;