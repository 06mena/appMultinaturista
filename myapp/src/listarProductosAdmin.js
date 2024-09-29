import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './barraPrincipal'
import Swal from 'sweetalert2'
import styles from './css/listar.module.css'


//Componente de React
const ListarProductosAdmin = () => {
  // productos es una variable de estado useState
  //setProductos es una funcion para actualizar la variable del useState
  const [productos, setProductos] = useState([]); //lo que hay dentro del useState es un array vacío que se llenará con los datos obtenidos... ELa variable productos econtiene el useState en el cual está contenido el array mencionado enteriormente
  //Cada que se llene el array el estado cambia, por lo que el componente se actualiza para mostrar el nuevo estado
  const [categorias, setCategorias] = useState([]);
  // Estado para manejar cuál celda se está editando
  const [editingProduct, setEditingProduct] = useState(null);
  // *******************************************
  const [mensaje, setMensaje] = useState('Sin mensaje') //Mensajes de las OFERTAS
  const [detalleOferta, setDetalleOferta] = useState(0);
  const [precioFinal, setPrecioFinal] = useState(0);
  const [ofertas, setOfertas] = useState(false);
  const [precio, setPrecio] = useState(0);


  //obtencion de datos con el usseEffect
  //realiza una acción después de que el componente se haya montado
  useEffect(() => {
    // Obtener productos
    axios.get('http://127.0.0.1:8000/api/productos/')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => console.error(error));

    // Obtener categorías
    axios.get('http://127.0.0.1:8000/api/categorias/')
      .then(response => {

        setCategorias(response.data);
        console.log(categorias)
      })
      .catch(error => console.error(error));


  }, []);

  // Crear un mapa de id de categoría a nombre de categoría
  const categoriaMap = categorias.reduce((acc, categoria) => {
    acc[categoria.id] = categoria.nombre;
    return acc;
  }, {});

  // console.log("Map de categorías:", categoriaMap);



  //EDITAR CELDA POR SEPARADO *******************************************************************
  //******************************************************************************************* */
  // Función para abrir un SweetAlert y actualizar una celda
  const getEstadoOptions = (stock) => {
    if (stock === 0) {
      return {
        'Agotado': 'Agotado',
        'Inactivo': 'Inactivo'
      };
    } else if (stock > 0 && stock < 3) {
      return {
        'Casi agotado': 'Casi agotado',
        'Inactivo': 'Inactivo'
      };
    } else if (stock >= 3) {
      return {
        'Activo': 'Activo',
        'Inactivo': 'Inactivo'
      };
    } else {
      return {
        '': 'Selecciona un estado'
      };
    }
  };

  const handleEditCell = (productId, field, currentValue, stock) => {
    // Obtener las opciones de estado basadas en el stock
    const estadoOptions = field === 'estado' ? getEstadoOptions(stock) : {};

    Swal.fire({
      title: `Editar ${field}`,
      input: field === 'estado' ? 'select' : 'text',
      inputValue: currentValue,
      inputOptions: estadoOptions,
      showCancelButton: true,
      html: field === 'estado'
        ? '<p style="color: red;">Si seleccionas "Inactivo", el producto desaparecerá del catálogo de los usuarios.</p>'
        : '',
      inputValidator: (value) => {
        if (!value || value.trim() === '') {
          return '¡Tienes que ingresar un valor válido!';
        }
      }
    }).then(result => {
      if (result.isConfirmed) {
        const newValue = result.value;

        // Actualizar el producto localmente
        setProductos(productos.map(produ =>
          produ.id === productId ? { ...produ, [field]: newValue } : produ
        ));

        // Realizar la actualización en el servidor
        axios.patch(`http://127.0.0.1:8000/api/productos/${productId}/`, { [field]: newValue })
          .then(response => {
            setProductos(productos.map(produ =>
              produ.id === productId ? response.data : produ
            ));
            Swal.fire('Actualizado exitosamente', '', 'success');
          }).catch(error => {
            console.error('Error al actualizar', error);
            Swal.fire('Error al actualizar', 'Intentelo de nuevo', 'error');
          });
      }
    });
  };


  //************************************************************************ */
  // FUNCIÓN DE EDITAR *******************************************************
  // Función que me permite abrir el formulario
  const handleEdit = (producto) => {
    setEditingProduct(producto)
    setDetalleOferta(parseInt(producto.porcentaje_descuento))
    setOfertas(producto.oferta)
    setPrecio(producto.precio)
    setPrecioFinal(producto.precio_final)
  }

  const handleCloseEdit = () => {
    setEditingProduct(null);
    setPrecio(0);
    setDetalleOferta(0);
    setMensaje('');
    setOfertas(false);
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // const ofertasActivo = e.target.querySelector('[name="ofertas"]').checked;
    // const detalleOferta = e.target.detalleOferta ? parseInt(e.target.detalleOferta.value) : null;
    if (mensaje !== 'La oferta es correcta.' && mensaje !== 'No hay oferta activa.') {
      Swal.fire({
        icon: 'warning',
        title: 'No se pudo agregar el producto',
        text: `${mensaje}`,
      });
      return; // Detener el envío del formulario
    }


    const updateProducto = {
      ...editingProduct,
      nombre: e.target.nombre.value,
      descripcion: e.target.descripcion.value,
      precio: parseInt(e.target.precio.value),
      estado: e.target.estado.value,
      categoria_id: parseInt(e.target.categoria.value),
      // ofertas: ofertasActivo,
      // detalleOferta: ofertasActivo ? detalleOferta : null
      en_oferta: ofertas ? ofertas : false,
      porcentaje_descuento: detalleOferta,
      precio_final: precioFinal
    };
    console.log(updateProducto.categoria);
    console.log(updateProducto.precio)

    console.log("Datos que se envían al servidor:", updateProducto);
    axios.patch(`http://127.0.0.1:8000/api/productos/${editingProduct.id}/`, updateProducto)
      .then(response => {
        console.log("Respuesta del servidor:", response.data);
        setProductos(productos.map(produ => (produ.id === editingProduct.id ? response.data : produ)));
        setEditingProduct(null);
        setDetalleOferta(0);
        setMensaje('');
        setOfertas(false);
        setPrecio(0);
        setPrecioFinal(0);
        Swal.fire('Actualizado exitosamente', '', 'success');
      }).catch(error => {
        console.error('Error al actualizar', error);
        Swal.fire('Error al actualizar', 'Intentelo de nuevo', 'error');
      });
  };

  useEffect(() => {
    if (ofertas) {
      const nuevoPrecio = precio - (precio * (detalleOferta / 100));
      if (!precio) {
        setMensaje('Debe escribir el precio fijo del producto.');
        setPrecioFinal('')
      } else if (!detalleOferta) {
        setMensaje('El detalle de la oferta está vacío.');
        setPrecioFinal(precio);
      } else if (detalleOferta < 0) {
        setMensaje('La oferta debe ser mayor de 0.');
        setPrecioFinal(precio);
      } else if (nuevoPrecio < 0) {
        setMensaje('El descuento debe ser menor.');
        setPrecioFinal(precio);
      } else {
        setPrecioFinal(nuevoPrecio);
        setMensaje('La oferta es correcta.');
      }
    } else {
      setPrecioFinal(null);
      setMensaje('No hay oferta activa.');
    }
  }, [ofertas, detalleOferta, precio]);




  // Función para formatear el precio
  const formatPrice = (price) => {
    return price.toLocaleString(); // Esto añadirá comas según la configuración local
  };


  // ***********************************************************

  //Renderizando el componente
  return ( // Lo que se renderiza después de todo
    <div className={`${styles.tableContainer}`}>

      <table>
        <thead>
          <tr className={styles.tr}>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Oferta</th>
            <th className={styles.stock}>Stock (Unidades)</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>

          {/* CUERPOOOOOOO DE LA TABLA ********************************************************************** */}
          {productos.map(produ => {
            // console.log("Producto:", produ); // Para inspeccionar cada producto y su campo "categoria"
            return (
              <tr key={produ.id}>
                {/* Nombre */}
                <td onClick={() => handleEditCell(produ.id, 'nombre', produ.nombre)} className={styles.nombre}>
                  {produ.nombre}
                </td>

                {/* Categoría */}
                <td className={styles.nombre}>
                  {/* {console.log("Categoria en producto:", produ.categoria.nombre)} Verificar qué contiene "categoria" */}
                  {produ.categoria.nombre} {/* Mostrar categoría en la tabla */}
                </td>

                {/* Precio */}
                <td onClick={() => handleEditCell(produ.id, 'precio', produ.precio)}>
                  {`$${formatPrice(produ.precio)}`}
                </td>

                {/* Descuento */}
                <td>
                  {`${produ.precio_final ? `$${formatPrice(produ.precio_final)}` : 'No aplica'}`}
                </td>

                <td>
                  {`${produ.en_oferta ? `${parseInt(produ.porcentaje_descuento)}%` : 'No aplica'}`}
                </td>

                {/* Stock */}
                <td onClick={() => handleEditCell(produ.id, 'stock', produ.stock)}>
                  {produ.stock}
                </td>

                {/* Estado */}
                <td onClick={() => handleEditCell(produ.id, 'estado', produ.estado, produ.stock)} className={styles.estadoCell}>
                  <span
                    className={`${produ.estado === "Activo" ? styles.EstadoActivo
                      : produ.estado === "Inactivo" ? styles.EstadoInactivo
                        : produ.estado === "Agotado" ? styles.EstadoAgotado
                          : produ.estado === "Casi agotado" ? styles.EstadoCasiAgotado
                            : styles.SinEstado}`}>
                    {produ.estado}
                  </span>
                </td>

                {/* Acciones */}
                <td>
                  <button className={styles.botonEditar} title='Editar información' onClick={() => handleEdit(produ)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>


      {/* MODEL PARA EDITAR */}

      {editingProduct && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Editar Producto</h3>
            <form onSubmit={handleEditSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  defaultValue={editingProduct.nombre}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  defaultValue={editingProduct.descripcion}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="precio">Precio</label>
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  defaultValue={editingProduct.precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="stock">Stock</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  value={editingProduct.stock}
                  // onChange={(e)=>setPrecio(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup} style={{ marginTop: '10px', marginBottom: '13px' }}>
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  defaultValue={editingProduct.estado}
                  className={styles.input}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Agotado">Agotado</option>
                  <option value="Casi agotado">Casi agotado</option>
                  <option value="Sin estado">Sin estado</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="categoria">Categoría</label>
                <select
                  id="categoria"
                  name="categoria"
                  defaultValue={editingProduct.categoria.id}
                  className={styles.input}
                >
                  {Object.keys(categoriaMap).map(id => (
                    <option key={id} value={id}>
                      {categoriaMap[id]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ofertas */}
              <div className={styles.formGroup} style={{ padding: '8px' }}>
                <label className={styles.switchLabel}>¿Deseas añadir ofertas?</label>
                <div className={styles.switchContainer}>
                  <button
                    type="button"
                    className={`${styles.switchButton} ${ofertas ? styles.active : ''}`}
                    onClick={() => setOfertas(true)}
                  >
                    SÍ
                  </button>
                  <button
                    type="button"
                    className={`${styles.switchButton} ${!ofertas ? styles.inactive : ''}`}
                    onClick={() => setOfertas(false)}
                  >
                    NO
                  </button>
                </div>
              </div>

              {ofertas && (
                <div className={styles.formGroup}>
                  <label htmlFor="detalleOferta">Porcentaje del descuento (%):</label>
                  <input
                    type="number"
                    id="detalleOferta"
                    name="detalleOferta"
                    defaultValue={detalleOferta}
                    onChange={(e) => setDetalleOferta(e.target.value)}
                    placeholder="Porcentaje de descuento"
                    className={styles.input}
                  />
                  <p>Precio Final: ${precioFinal}</p>
                  <div className={`${styles.alert} ${(mensaje === 'La oferta es correcta.' || mensaje === '')
                    ? styles.alertSuccess
                    : styles.alertWarning}`}>
                    {mensaje}
                  </div>
                </div>
              )}

              <button type="submit" className={styles.btnSubmit}>Actualizar</button>
              <button type="button" onClick={handleCloseEdit} className={styles.btnClose}>Cerrar</button>
            </form>
          </div>
        </div>
      )}




    </div>)
};

export default ListarProductosAdmin; //puede ser utilizado o importado en otros archivos