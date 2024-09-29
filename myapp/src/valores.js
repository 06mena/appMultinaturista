import React from 'react';
import styles from './css/valores.module.css'; // Asegúrate de incluir los estilos en un archivo separado

const Valores = () => {
  const valoresData = [
    {
      title: "Servicio",
      text: "Integrar experiencias y conocimientos para satisfacer las necesidades de nuestros clientes.",
      imgSrc: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725968213/servicio_juadit.png"
    },
    {
      title: "Confianza",
      text: "Ofrecer productos y servicios de la más alta calidad.",
      imgSrc: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725968185/confianza_weguum.png"
    },
    {
      title: "Honestidad",
      text: "Actuar con transparencia y coherencia en todas nuestras prácticas.",
      imgSrc: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725968205/honestidad_obnnuh.png"
    },
    {
      title: "Reciprocidad",
      text: "Crear una relación beneficiosa con la comunidad y el entorno.",
      imgSrc: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725968209/reciprocidad_crzgs2.png"
    }
  ];

  return (
    <div className={styles.valoresContainer}>
      <h2 className={styles.tituloCompValor}>Valores</h2>
      <div className={styles.valoresGrid}>
        {valoresData.map((valor, index) => (
          <div key={index} className={styles.valorItem}>
            <img src={valor.imgSrc} alt={valor.title} className={styles.img} />
            <h3 className={styles.tituloValor}>{valor.title}</h3>
            <p className={styles.textoValor}>{valor.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Valores;