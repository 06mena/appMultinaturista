import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Pedido from './datosPedido'; // Importar el componente Pedido
import styles from './css/pedidos.module.css'; // Usamos estilos en CSS Modules

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  // Efecto para cargar pedidos desde la API
  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pedidos/');
        setPedidos(response.data);
      } catch (error) {
        console.error('Error cargando pedidos:', error);
        Swal.fire('Error', 'No se pudieron cargar los pedidos.', 'error');
      }
    };
    
    cargarPedidos();
  }, []);

  return (
    <div className={styles.adminPedidos}>
      <h1 className={styles.title}>Administrar Pedidos</h1>
      {pedidos.length > 0 ? (
        pedidos.map(pedido => <Pedido key={pedido.id} pedido={pedido} />)
      ) : (
        <p>No hay pedidos disponibles.</p>
      )}
    </div>
  );
};

export default Pedidos;
