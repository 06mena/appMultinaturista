import React from 'react';
import styles from './css/recomendaciones.module.css'; // Usando módulos CSS
import ListarProductos from './listarProductos';
import { Link } from 'react-router-dom';

const Recomenda = () => {
  return (
    <div className={styles.recomendaciones}>
      <div className={styles.alignCenter}>
      <Link to="/productosLista" className={styles.linkDecoration}><h2 className={styles.tituloOfertas}>Recomendaciones</h2></Link >
        <ListarProductos limit={3} isHome={true} />
      </div>
    </div>
  );
};

export default Recomenda;