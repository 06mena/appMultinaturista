import React from 'react';
import BarraPrincipal from './barraPrincipal';
import styles from './css/nosotros.module.css';
import Valores from './valores';
import Mision from './mision';
import Footer from './footer';

const Nosotros = () => {
  return (
    <div>
      <BarraPrincipal />
      <div className={styles.textoNosotros}>
        <h2 className={styles.h2Title}>Nosotros</h2>
        <div className={styles.nosotros}>
          <p>Fundada en el 2022, Multinaturista y Deportivo El Obrero se ha convertido en un punto de referencia en el barrio Obrero de Bello para quienes buscan mejorar su bienestar integral a través de productos naturales de alta calidad. Nuestra misión es ofrecer a nuestros clientes soluciones que promuevan un estilo de vida saludable, respetuoso con el medio ambiente, y que respondan a sus necesidades individuales con un servicio personalizado.</p>

          <p>Desde nuestros inicios, nos hemos comprometido a ser más que una tienda; somos una comunidad que valora la salud y el bienestar de todos. Creemos firmemente en el poder de la naturaleza para mejorar la calidad de vida, y trabajamos cada día para ser líderes en el sector de productos naturales en Bello.</p>

          <p>Con la visión de ser la tienda naturista de mayor confianza y reconocimiento en la región, aspiramos a expandir nuestra influencia y a seguir fortaleciendo nuestra relación con la comunidad. Nuestro enfoque en la sostenibilidad y el compromiso social nos guía en cada paso, y nos esforzamos por ser un referente en productos naturistas, ofreciendo a nuestros clientes la seguridad de que están haciendo una elección saludable y responsable.</p>
        </div>
      </div>
      
      <Valores />
      <Mision />
      <Footer className={styles.footerNosotros} />
    </div>
  );
}

export default Nosotros;
