import React, { useState, useContext } from "react";
import { CartContext } from "./cartContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./css/checkout.module.css";
import BarraPrincipal from "./barraPrincipal";
import Footer from "./footer";

const Checkout = () => {
  const { cart, getTotal, getSubtotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Estado del formulario de datos del cliente
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    correo: "",
    celular: "",
    ciudad: "",
    barrio: "",
    direccion: "",
    notas: ""
  });

  // Estado del método de pago y términos aceptados
  const [paymentMethod, setPaymentMethod] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  /* =====================
     Funciones de manejo de estado
     ===================== */

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Manejar el cambio de método de pago
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Manejar cambios en los términos y condiciones
  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  /* =====================
     Manejo del envío del formulario
     ===================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de selección de método de pago y términos aceptados
    if (!paymentMethod) {
      Swal.fire({
        icon: "warning",
        title: "¡Atención!",
        text: "Por favor, selecciona un método de pago.",
      });
      return;
    }

    if (!termsAccepted) {
      Swal.fire({
        icon: "warning",
        title: "¡Atención!",
        text: "Debes aceptar los términos y condiciones.",
      });
      return;
    }

    // Preparar los datos del pedido
    const pedido = {
      cliente: {
        nombre: form.nombre,
        email: form.correo,
        direccion: form.direccion,
        celular: form.celular,
      },
      direccion: form.direccion,
      total: getTotal(),
      productos: cart.map((product) => ({
        producto: product.id,
        cantidad: product.quantity,
        precio_unitario: parseFloat(product.precio),
      })),
    };

    // Realizar la petición para crear el pedido
    fetch("http://localhost:8000/api/crear-pedido/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error || "Error al realizar el pedido");
          });
        }
        return response.json();
      })
      .then((data) => {
        clearCart();
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Pedido realizado satisfactoriamente",
        });
        clearCart();
        navigate("/");
        // Redirigir al usuario o limpiar el carrito
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al realizar el pedido: " + error.message,
        });
      });
  };

  const formatPrice = (price) => {
    // Asegurarse de que el precio es un número
    const numericPrice = parseFloat(price);
    return numericPrice.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  /* =====================
     Renderizado del componente
     ===================== */

  return (
    <div>
      <BarraPrincipal />
      <div className={styles.checkoutContainer}>
        <h2 className={styles.tituloFinalizar}>Finalizar compra</h2>
        <div className={styles.checkoutContent}>
          {/* Formulario de facturación */}
          <form className={styles.billingForm} onSubmit={handleSubmit}>
            <h3 className={styles.subtitulosFinalizar}>Información de compra</h3>
            <div className={styles.formGroup}>
              <label>Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Apellidos *</label>
              <input
                type="text"
                name="apellidos"
                value={form.apellidos}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Tipo de documento *</label>
              <select
                name="tipoDocumento"
                value={form.tipoDocumento}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Seleccione un tipo de documento</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Número de documento *</label>
              <input
                type="text"
                name="numeroDocumento"
                value={form.numeroDocumento}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Correo electrónico *</label>
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Celular *</label>
              <input
                type="text"
                name="celular"
                value={form.celular}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Ciudad *</label>
              <input
                type="text"
                name="ciudad"
                value={form.ciudad}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Barrio *</label>
              <input
                type="text"
                name="barrio"
                value={form.barrio}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Dirección *</label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
              />
            </div>
            <button className={styles.submitBtn} type="submit">
              Realizar pedido
            </button>
          </form>

          {/* Resumen del pedido */}
          <div className={styles.orderSummary}>
            <h3 className={styles.subtitulosFinalizar}>Tu pedido</h3>
            <table>
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>{formatPrice(getSubtotal())}</td>
                </tr>
                <tr>
                  <td>Envío</td>
                  <td>{formatPrice(5000)}</td>
                </tr>
                <tr className={styles.totalRow}>
                  <td>Total</td>
                  <td>{formatPrice(getTotal())}</td>
                </tr>
              </tbody>
            </table>

            {/* Opciones de pago */}
            <div className={styles.paymentOptions}>
              <h4 className={styles.subtitulosFinalizar}>Opciones de pago</h4>
              <label>
                <input
                  type="radio"
                  name="pago"
                  value="datáfono"
                  checked={paymentMethod === "datáfono"}
                  onChange={handlePaymentChange}
                  required
                />
                Pago contraentrega
              </label>
            </div>

            {/* Aceptación de términos */}
            <div className={styles.terms}>
              <p>
                Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web y otros propósitos descritos en nuestra política de privacidad.
              </p>
              <label>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                  required
                />{" "}
                He leído y acepto los{" "}
                <Link to="shipping-policy">términos y condiciones</Link> de la web*
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
