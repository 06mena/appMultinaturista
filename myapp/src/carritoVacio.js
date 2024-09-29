import React from 'react'
import styles from './css/carroVacio.module.css'

const CarritoVacio = () => {
  return (
    <div className={styles.carritoVacioContenedor}>
      <div>
        <img className={styles.carritoIcono} src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1725890244/carrito_vacio_ybgvir.png" alt="Carrito vacío" />
      </div>
      <p className={styles.carritoEmpty}>Tu carrito está vacío</p>
    </div>
  )
}

export default CarritoVacio