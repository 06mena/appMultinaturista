import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/ofertas.module.css';
import ProductosOferta from './productosOferta';

const Kit = () => {
  return (
    <div className={styles.kitOfertas}>
      <div className={`row ${styles.alingCenter}`}>
        <Link to="/ofertas" className={styles.linkDecoration}><h2 className={styles.tituloOfertas}>Ofertas</h2></Link >
        <ProductosOferta limit={3} isHome={true}/>
      </div>
    </div>
  );
};

export default Kit;
