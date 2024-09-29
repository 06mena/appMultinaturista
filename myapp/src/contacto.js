import React, { useState } from 'react';
import BarraPrincipal from './barraPrincipal';
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";
import UbicacionMapa from './ubicacion';
import Footer from './footer';
import styles from './css/contacto.module.css';
import Swal from 'sweetalert2';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const whatsappNumber = "+573103351575"; // Número de WhatsApp
  const whatsappMessage = "Hola, tengo una consulta."; // Mensaje predeterminado

  // Función para manejar timeout personalizado
  const fetchWithTimeout = (url, options, timeout = 10000) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Se ha excedido el tiempo de espera"));
      }, timeout);

      fetch(url, options)
        .then((response) => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const mensajeData = {
      nombre: nombre,
      email: email,
      mensaje: mensaje,
    };
  
    try {
      setLoading(true);
      Swal.fire({
        title: 'Enviando...',
        text: 'Por favor, espera mientras enviamos tu mensaje.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetchWithTimeout('http://127.0.0.1:8000/api/enviar-mensaje/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensajeData),
      });
  
      if (response.ok) {
        Swal.fire({
          title: '¡Mensaje enviado!',
          text: 'Tu mensaje ha sido enviado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        setNombre('');
        setEmail('');
        setMensaje('');
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: `Error: ${errorData.error}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: error.message === "Se ha excedido el tiempo de espera" 
              ? "El servidor está tardando demasiado en responder. Inténtalo nuevamente más tarde."
              : 'Error al intentar enviar el mensaje',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div>
      <BarraPrincipal />
      <div className={`container mt-4 ${styles.container}`}>
        <h1 className={`${styles.tituloContacto} text-center`} style={{ marginBottom: '20px' }}>Contacto</h1>

        <div className="row">

          {/* Columna Izquierda - Información de Contacto y Tabla Informativa */}
          <div className="col-md-12 col-lg-4 mb-4">
            <div className={styles.card}>
              <h2 className={styles.colorTitulo}>Información de Contacto</h2>
              <p><strong>Sede principal:</strong> Cra. 53 # 33 - 19 San Jose Obrero - Bello</p>
              <p><strong>Redes sociales:</strong></p>
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

            {/* Tabla Informativa debajo de Información de Contacto */}
            <div className={styles.card}>
              <h3 className={styles.colorTitulo}>Información de la Tienda</h3>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><strong>Horario</strong></td>
                    <td>Lun. a Sáb. 11:00 am a 6:00 pm. <br />Dom. 11:00 am a 4:00 pm.</td>
                  </tr>
                  <tr>
                    <td><strong>Tienda Online</strong></td>
                    <td>Abierta 24h.</td>
                  </tr>
                  <tr>
                    <td><strong>Envíos Seguros</strong></td>
                    <td>Compra segura y diferentes medios de pago.</td>
                  </tr>
                  <tr>
                    <td><strong>Devoluciones Fáciles</strong></td>
                    <td>Si no te encanta, lo devuelves. ¡Así de simple!</td>
                  </tr>
                  <tr>
                    <td><strong>Productos de Calidad</strong></td>
                    <td>Calidad superior, garantizada. ¡Vive la excelencia en cada compra!</td>
                  </tr>
                  <tr>
                    <td><strong>Asesoría</strong></td>
                    <td>Recibe asesoría especializada en nuestros productos.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Columna Derecha - Mapa */}
          <div className="col-md-12 col-lg-8 mb-4">
            <div className={styles.card}>
              <h3 className={styles.colorTitulo}>Nuestra Ubicación</h3>
              <div className={styles.mapContainer}>
                <UbicacionMapa /> {/* Aquí se mostrará el mapa */}
              </div>
            </div>

             {/* Nueva Sección - Escríbenos debajo del mapa */}
            <div className={styles.card}>
              <h3 className={styles.colorTitulo}>Escríbenos</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className={`form-group ${styles.inputEscribenos}`}>
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={`form-group ${styles.inputEscribenos}`}>
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    className="form-control"
                    id="mensaje"
                    rows="4"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className={`btn btn-primary mt-3 ${styles.botonEnviar}`}>{loading ? 'Enviando...' : 'Enviar'}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacto;
