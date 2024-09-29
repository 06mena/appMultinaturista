import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './css/pedidos.module.css'; // Usamos estilos en CSS Modules

const Pedido = ({ pedido }) => {
  const handleEstadoChange = async (nuevoEstado) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/pedidos/${pedido.id}/`, { estado: nuevoEstado });
      Swal.fire('Estado actualizado', 'El estado del pedido ha sido actualizado', 'success');
    } catch (error) {
      console.error('Error actualizando estado:', error);
      Swal.fire('Error', 'Hubo un problema actualizando el estado del pedido', 'error');
    }
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  // Sumar el total de los productos del pedido
  const totalCalculado = pedido.productos.reduce((acc, producto) =>
    acc + (parseFloat(producto.precio_unitario) * parseFloat(producto.cantidad)), 0);

  return (
    <div className={styles.pedido}>
      <h3 className={styles.pedidoTitle}>Pedido #{pedido.id}</h3>
      <p><strong>Cliente:</strong> {pedido.cliente.nombre}</p>
      <p><strong>Dirección:</strong> {pedido.cliente.direccion}</p>
      <p><strong>Teléfono:</strong> {pedido.cliente.telefono}</p>
      <div className={styles.selectContainer}>
        <label htmlFor={`estado-${pedido.id}`} className={styles.selectLabel}>Estado del Pedido:</label>
        <select
          id={`estado-${pedido.id}`}
          value={pedido.estado}
          onChange={(e) => handleEstadoChange(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">Seleccionar Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="enviado">Enviado</option>
          <option value="entregado">Entregado</option>
        </select>
      </div>

      <h4>Productos del pedido:</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {pedido.productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.nombre_producto}</td> {/* Nombre del producto */}
              <td>{producto.cantidad}</td>
              <td>{formatPrice(producto.precio_unitario)}</td>
              <td>{formatPrice(producto.cantidad * producto.precio_unitario)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={styles.totalPedido}>
        <strong>Total del pedido:</strong> {formatPrice(totalCalculado)}
      </p>
    </div>
  );
};

export default Pedido;
