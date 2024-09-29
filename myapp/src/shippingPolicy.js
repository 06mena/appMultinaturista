import React from 'react';
import styles from './css/shippingPolicy.module.css';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';

const ShippingPolicy = () => {
  return (
    <div>
      <BarraPrincipal />
      <div className="container-fluid">
        <div className={styles.containerCustom}>
          {/* Menú de navegación en la izquierda */}
          <nav id="navbar-example3" className={`h-100 flex-column align-items-stretch pe-4 ${styles.navbarCustom}`}>
            <nav className="nav nav-pills flex-column">
              <a className={`nav-link ${styles.navLinkCustom}`} href="#politica-envios">Política de Envíos</a>
              <a className={`nav-link ${styles.navLinkCustom}`} href="#politica-datos-personales">Política de Datos Personales</a>
              <a className={`nav-link ${styles.navLinkCustom}`} href="#politica-cambios-devoluciones">Política de Cambios y Devoluciones</a>
              <a className={`nav-link ${styles.navLinkCustom}`} href="#politica-cookies">Política de Cookies</a>
            </nav>
          </nav>

          {/* Contenido con scroll en la derecha */}
          <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className={styles.scrollContent} tabIndex="0">
            <section id="politica-envios" className={styles.policySection}>
              <p className={styles.bienvenidoPoliticas}>Bienvenido a nuestra tienda en línea. A continuación, se detallan los términos y condiciones para el uso de nuestro sitio web. Por favor, léalos detenidamente. Si no está de acuerdo con estos términos, le pedimos porfavor que no utilice nuestro sitio.
                <br /><br />
                Al acceder y utilizar este sitio web, usted acepta estos términos y condiciones en su totalidad.
              </p>

              <h1 className={styles.title}>Política de Envíos</h1>
              <h3 className={styles.subtitle}>1. Ámbito de Envío</h3>
              <p>Realizamos envíos a toda el área metropolitana en un plazo de 1 a 5 días hábiles. Para zonas rurales o de difícil acceso, el tiempo de entrega puede extenderse hasta 7 días hábiles.</p>
              <p>Ofrecemos la posibilidad de realizar envíos urgentes con un costo adicional. Todos nuestros envíos son realizados a través de empresas de transporte reconocidas, lo que garantiza la seguridad y puntualidad de las entregas.</p>

              <h3 className={styles.subtitle}>2. Costo de Envío</h3>
              <p>El costo del envío tiene una tarifa estándar de $5.000 COP para áreas urbanas. En zonas rurales o de difícil acceso, el costo puede variar. Ofrecemos tarifas especiales en pedidos mayores a $100.000 COP.</p>
              <p>En caso de que el paquete sufra algún daño durante el transporte, asumimos la responsabilidad de reemplazar o reembolsar el valor del producto, siempre que se reporte en un plazo de 48 horas después de la recepción.</p>

              <h3 className={styles.subtitle}>3. Tiempo de Entrega</h3>
              <p>El tiempo de entrega varía según la ubicación y las condiciones logísticas. Durante temporadas altas como Navidad o eventos especiales, los tiempos de entrega podrían extenderse debido al volumen de pedidos.</p>

              <h3 className={styles.subtitle}>4. Problemas con el Envío</h3>
              <p>Si experimenta algún inconveniente con su envío, como retrasos o paquetes extraviados, le pedimos que nos contacte de inmediato. Nuestro equipo de atención al cliente se encargará de brindarle una solución lo antes posible.</p>
            </section>

            <section id="politica-datos-personales" className={styles.policySection}>
              <h1 className={styles.title}>Política de Tratamiento de Datos Personales</h1>
              <p>En rigor de la Ley 1581 de 2012 y el Decreto 137 de 2013, que regulan la recolección y administración de datos personales, Multinaturista y Deportivo "El Obrero" se compromete a proteger su información personal. A continuación, se describen nuestros procedimientos para el manejo de datos personales</p>
              <h3 className={styles.subtitle}>1. Autorización</h3>
              <p>Al proporcionar su información personal, nos autoriza a utilizarla exclusivamente para fines administrativos, comerciales y de atención al cliente. Garantizamos que sus datos están protegidos bajo estrictos estándares de seguridad.</p>

              <h3 className={styles.subtitle}>2. Derechos del Titular</h3>
              <p>Como titular de sus datos, usted tiene derecho a conocer, actualizar y rectificar su información personal. También puede solicitar la eliminación de sus datos en cualquier momento, siempre y cuando no existan obligaciones legales que lo impidan.</p>

              <h3 className={styles.subtitle}>3. Modificaciones</h3>
              <p>Nos reservamos el derecho de modificar esta política en cualquier momento para cumplir con cambios normativos. Cualquier cambio será notificado a través de nuestra página web.</p>
            </section>

            <section id="politica-cambios-devoluciones" className={styles.policySection}>
              <h1 className={styles.title}>Política de Cambios y Devoluciones</h1>
              
              <h3 className={styles.subtitle}>1. Cambios</h3>
              <h4 className={styles.subtitle}>Plazo para solicitar cambios:</h4>
              <p>Tienes hasta 3 días hábiles a partir de la fecha de recepción del producto para solicitar un cambio.</p>

              <h4 className={styles.subtitle}>Condiciones para cambios:</h4>
              <ul>
                <li>El producto debe estar sin usar y en su empaque original.</li>
                <li>Debe incluir todos los accesorios y etiquetas originales.</li>
                <li>Es necesario presentar el comprobante de compra.</li>
              </ul>

              <h4 className={styles.subtitle}>Proceso para solicitar cambios:</h4>
              <p>
                Contacta a nuestro servicio al cliente a través de correo electrónico o por teléfono para notificar tu solicitud de cambio. Proporciona el número de orden y una descripción detallada del motivo del cambio.
              </p>

              <h4 className={styles.subtitle}>Gastos de envío:</h4>
              <p>Los gastos de envío para devolver el producto original y recibir el nuevo correrán a cargo del cliente, a menos que el cambio sea debido a un error por parte de Tienda Naturista Colombia.</p>

              <h3 className={styles.subtitle}>2. Devoluciones</h3>
              <h4 className={styles.subtitle}>Plazo para solicitar devoluciones:</h4>
              <p>Tienes hasta 3 días hábiles a partir de la fecha de recepción del producto para solicitar una devolución.</p>

              <h4 className={styles.subtitle}>Condiciones para devoluciones:</h4>
              <ul>
                <li>El producto debe estar sin usar y en su empaque original.</li>
                <li>Debe incluir todos los accesorios y etiquetas originales.</li>
                <li>Es necesario presentar el comprobante de compra.</li>
              </ul>

              <h4 className={styles.subtitle}>Proceso para solicitar devoluciones:</h4>
              <p>
                Contacta a nuestro servicio al cliente a través de correo electrónico o por teléfono para notificar tu solicitud de devolución. Proporciona el número de orden y una descripción detallada del motivo de la devolución.
              </p>

              <h4 className={styles.subtitle}>Reembolsos:</h4>
              <p>
                Los reembolsos se realizan a través del mismo método de pago utilizado para la compra. El tiempo de procesamiento puede variar, pero nos esforzamos por completar el reembolso lo antes posible.
              </p>

              <h4 className={styles.subtitle}>Excepciones:</h4>
              <p>No aceptamos cambios ni devoluciones en productos perecederos, productos de higiene personal, productos con desperfectos o productos con descuentos especiales.</p>

              <p>Recuerda que esta política puede estar sujeta a cambios, por lo que te recomendamos revisar periódicamente. Para cualquier pregunta adicional, no dudes en ponerte en contacto con nuestro equipo de servicio al cliente.</p>
            </section>

            <section id="politica-cookies" className={styles.policySection}>
              <h1 className={styles.title}>Política de Cookies</h1>
              <h3 className={styles.subtitle}>1. ¿Qué son las Cookies?</h3>
              <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio. Nos permiten ofrecerle una experiencia personalizada y mejorar el rendimiento del sitio.</p>

              <h3 className={styles.subtitle}>2. ¿Cómo Usamos las Cookies?</h3>
              <p>Utilizamos cookies para personalizar el contenido, analizar el tráfico web y mejorar su experiencia de navegación. Puede deshabilitar las cookies en cualquier momento ajustando la configuración de su navegador.</p>

              <div className={styles.cajaAgradecimiento}>
                <p className={styles.agradecimiento}>Atentamente, <br />
                  Equipo de  Multinaturista y Deportivo "El Obrero" </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;