import React from "react";
import styles from "./css/mision.module.css";

const Mision = () => {
  return (
    <div className={styles.missionWrapper}>
      <div className={styles.textSection}>
        <h2 className={styles.tituloMisionVision}>Misión</h2>
        <p className={styles.textoMisionVision}>
          En Multinaturista y Deportivo El Obrero, nos dedicamos a promover el
          bienestar integral de nuestros clientes mediante la oferta de productos
          naturales de alta calidad. Nos comprometemos a brindar un servicio
          personalizado y a fomentar un estilo de vida saludable a través de
          soluciones naturales que respeten el medio ambiente.
        </p>
      </div>
      <div className={styles.textSection}>
        <h2 className={styles.tituloMisionVision}>Visión</h2>
        <p className={styles.textoMisionVision}>
          Ser la tienda líder en el sector de productos naturales en Bello, reconocida
          por nuestra dedicación a la salud y el bienestar de la comunidad. Aspiramos a
          expandir nuestra influencia, convirtiéndonos en un referente de confianza en
          productos naturistas, con un enfoque en la sostenibilidad y el compromiso social.
        </p>
      </div>
      <img 
        src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1726174124/planta-der.svg_remvci.png" 
        alt="planta decorativa" 
        className={styles.decorativeIcon}
      />
    </div>
  );
};

export default Mision;