import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/footer.module.css';
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Footer = () => {
  const [categorias, setCategorias] = useState([]);
  const whatsappNumber = "+573103351575"; // Número de WhatsApp
  const whatsappMessage = "Hola, tengo una consulta."; // Mensaje predeterminado

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categorias/')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => console.error('Error al cargar las categorías:', error));
  }, []);

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={`${styles.footerSection} footer-logo`}>
        <Link to="/">
            <img 
              src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1726073299/logoTienda_deyf5y.jpg" 
              alt="Multinaturista El Obrero" 
              className={styles.footerLogo} 
            />
          </Link>
        </div>
        <div className={`${styles.footerSection} ${styles.footerInfo}`}>
          <h5>Información</h5>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link href="#">Tips</Link></li>
            <li><Link to="/shipping-policy">Políticas</Link></li>
            <li><Link to="/loginAdmin">Administrador</Link></li>
          </ul>
        </div>
        <div className={`${styles.footerSection} ${styles.footerCategories}`}>
          <h5>Categorías</h5>
          <ul>
            {categorias.map((categoria) => (
              <li key={categoria.id}><Link to={`/categoria/${categoria.id}`}>{categoria.nombre}</Link></li>
            ))}
          </ul>
        </div>
        <div className={`${styles.footerSection} ${styles.footerContact}`}>
          <h5>Contacto</h5>
          <p><strong>Oficina principal:</strong><br />Cra. 53 # 33-19. Barrio San jose Obrero - Bello</p><br/>
          <strong>Redes sociales:</strong>
          <p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
            >
              <FaWhatsapp size={24} color='green' /> 3103351575
            </a>
          </p>
          <p>
            <a
              className={styles.linkDecoration}
              href='https://www.instagram.com/natu_deport?igsh=NmNtN2l1dzhwYWw5'
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} color='green' /> Multinaturista y Deportivo
            </a>
          </p>

          <p>
            <a
              className={styles.linkDecoration}
              href='https://www.facebook.com/share/CnWdiFo7bWc4aQG4/?mibextid=qi2Omg'
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillFacebook size={24} color='green' /> Multinaturista y Deportivo El Obrero
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
