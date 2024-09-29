import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './barraPrincipal';
import Swal from 'sweetalert2';
// import { Link } from 'react-router-dom';
import styles from './css/addProductos.module.css'

const FormProductos = () => {
  // Estados para almacenar los datos del formulario y el archivo
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState('Sin descripción');
  const [stock, setStock] = useState(0);
  const [ur_imagen, setUrl_imagen] = useState(null);
  const [file, setFile] = useState(null);
  const [publicId, setPublicId] = useState(''); // Guarda el public_id de la imagen
  const [isUploading, setIsUploading] = useState(false); // Estado para rastrear si la imagen está cargando
  const [categorias, setCategorias] = useState([]); // Estado para las categorías
  const [categoria, setCategoria] = useState(1);
  const [ofertas, setOfertas] = useState(false);
  const [detalleOferta, setDetalleOferta] = useState(0);
  const [precioFinal, setPrecioFinal] = useState(0);
  const fileInputRef = useRef(null); // Ref para el input de archivo
  const [mensaje, setMensaje] = useState('Sin mensaje') //Mensajes de las OFERTAS
  const [estado, setEstado] = useState('Activo'); // Estado inicial 'Activo' ESTADO!



  // Cargar categorías al montar el componente ------------------------------------------------------
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categorias/') // Cambia esta URL si es necesario
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => console.error(error));
  }, []);






  // Manejador de envío del formulario ---------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (isUploading) {
      let timerInterval;
      Swal.fire({
        title: "¡Por favor espera mientras se carga la imagen!",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("Intentaste enviar el formulario sin subir la imagen");
        }
      });
      return; // Evita el envío del formulario
    }
    const maxLength = 500;
    if (ur_imagen.length > maxLength) {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo agregar el producto',
        text: `La URL de la imagen no puede tener más de ${maxLength} caracteres.`,
      });
      return; // Detener el envío del formulario
    }

    if (mensaje !== 'La oferta es correcta.' && mensaje !== 'No hay oferta activa.') {
      Swal.fire({
        icon: 'warning',
        title: 'No se pudo agregar el producto',
        text: `${mensaje}`,
      });
      return; // Detener el envío del formulario
    }


    // Construir el objeto para enviar al backend
    const productoData = {
      nombre,
      precio,
      descripcion,
      stock,
      imagen_url: ur_imagen,
      categoria: parseInt(categoria) || null,
      oferta: ofertas,
      estado,
    };

    // Si las ofertas están habilitadas, añadir los campos de la oferta
    if (ofertas) {
      productoData.porcentaje_descuento = detalleOferta;
      productoData.precio_final = precioFinal;
    }




    // // Envia los datos del formulario al backend
    axios.post('http://127.0.0.1:8000/api/productos/', productoData)
      .then(response => {
        // Maneja la respuesta exitosa del servidor
        console.log(response.data);
        console.log(publicId);
        console.log(estado)
        // Reinicia los campos del formulario y el archivo
        setNombre('');
        setPrecio(0);
        setDescripcion('Sin descripción');
        setStock(0);
        setUrl_imagen(null);
        setFile(null);
        setCategoria(1);
        setOfertas(false);
        setDetalleOferta(0);
        setEstado('Activo')
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "El nuevo producto ha sido agregado",
          icon: "success"
        });

      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al enviar los datos. Por favor, inténtalo de nuevo.',
          icon: 'error'
        });
      });
  };


  // Manejador de las ofertas ----------------------------------------------------------------------
  const numDetalleOferta = parseFloat(detalleOferta);

  useEffect(() => {
    console.log(ofertas)

    if (ofertas) {
      // Si hay ofertas activas, realiza las validaciones correspondientes
      const nuevoPrecio = precio - (precio * (numDetalleOferta / 100));
      if (!precio) {
        setMensaje('Debe escribir el precio fijo del producto.');
      } else if (!numDetalleOferta) {
        setMensaje('El detalle de la oferta está vacío.');
        setPrecioFinal(precio);
      } else if (numDetalleOferta < 0) {
        setMensaje('La oferta debe ser mayor de 0.');
        setPrecioFinal(precio);
      } else if (nuevoPrecio < 0) {
        setMensaje('El descuento debe ser menor.');
        setPrecioFinal(precio);
      } else {
        // Oferta válida
        setPrecioFinal(nuevoPrecio);
        setMensaje('La oferta es correcta.');
      }
    } else {
      // Si ofertas es false, simplemente establecemos el precio sin descuento
      setPrecioFinal(precio);
      setMensaje('No hay oferta activa.');
    }
  }, [ofertas, numDetalleOferta, precio]);




  // Manejador de cambio de stock -------------------------------------------------------------------
  const handleStockChange = (e) => {
    setStock(parseInt(e.target.value, 10));
    // setEstado(''); // Resetear el estado al cambiar el stock
  };

  // Obtener las opciones de estado según el valor de stock -----------------------------------------
  const getEstadoOptions = () => {
    if (stock === 0) {
      return (
        <>
          <option value="Agotado">Agotado</option>
          <option value="Inactivo">Inactivo</option>
        </>
      );
    } else if (stock > 0 && stock < 3) {
      return (
        <>
          <option value="Casi Agotado">Casi Agotado</option>
          <option value="Inactivo">Inactivo</option>
        </>
      );
    } else if (stock > 2) {
      return (
        <>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </>
      );
    } else {
      return <option value="">Selecciona un estado</option>;
    }
  };



  // Eliminar la imagen ---------------------------------------------------------------------------
  const handleImageDelete = () => {
    setUrl_imagen("");
    setFile(null); // Limpia el archivo en el estado
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Limpia el input file
    }
  };

  // Manejador para cargar la imagen a Cloudinary -------------------------------------------------
  const handleImageUpload = async (e) => {
    try {
      setIsUploading(true); // Comienza la carga de la imagen
      const file = e.target.files[0]; // Obtiene el archivo seleccionado
      if (!file) {
        console.log('No file selected');
        return;
      }

      const data = new FormData(); // Crea un objeto FormData para enviar el archivo
      data.append("file", file); // Agrega el archivo al FormData
      data.append("upload_preset", "imagen_productos"); // Agrega el preset de subida de Cloudinary

      const response = await axios.post("https://api.cloudinary.com/v1_1/dwsoxf7zi/image/upload", data);

      // Maneja la respuesta de Cloudinary
      console.log(response.data);
      setPublicId(response.data.public_id);
      setUrl_imagen(response.data.secure_url); // Guarda la URL de la imagen en el estado
    } catch (error) {
      // Maneja diferentes tipos de errores
      if (error.response) {
        console.log('Error:', error.response.data);
        console.log('Status:', error.response.status);
      } else if (error.request) {
        console.log('Request Error:', error.request);
      } else {
        console.log('Unexpected Error:', error.message);
      }
    } finally {
      setIsUploading(false); // Termina la carga de la imagen
    }
  };





  return (

    // caja que contiene todo el formulario
    <div className={styles.formContainer}>
      {/* Empieza en formulario */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Agregar nuevos productos</h2>

        {/* NOMBRE ******************************************************** */}
        <div className={styles.formGroup}>
          <label htmlFor="nombre">Nombre del Producto</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto"
            required
            className={styles.input}
          />
        </div>


        {/* PRECIO******************************************************** */}
        <div className={styles.formGroup}>
          <label htmlFor="precio">Precio del Producto</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio del producto"
            required
            className={styles.input}

          />
        </div>


        {/* OFERTAS ****************************************************************** */}
        <div className={styles.formGroup}>
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
              value={detalleOferta}
              onChange={(e) => setDetalleOferta(e.target.value)}
              placeholder="Porcentaje de descuento"
              className={styles.input}
            />
            <p style={{ padding: '5px' }}>Precio Final: ${precioFinal}</p>
            <div className={`${styles.alert} ${(mensaje === 'La oferta es correcta.' || mensaje === '')
              ? styles.alertSuccess
              : styles.alertWarning}`}
              role="alert">
              {mensaje}
            </div>
          </div>


        )}



        {/* DESCRIPCIÓN **************************************************** */}
        <div className={styles.formGroup}>
          <label htmlFor="descripcion">Descripción del Producto</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del producto"
            rows="3"
            className={styles.textarea}
          />
        </div>

        {/* STOCK ********************************************************** */}
        <div className={styles.formGroup}>
          <label htmlFor="stock">Stock del Producto</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={handleStockChange}
            placeholder="Stock del producto"
            className={styles.input}
          />
        </div>

        {/* CATEGORIA ************************************************************* */}
        <div className={styles.formGroup}>
          <label htmlFor="categoria">Categoría del Producto</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            className={styles.select}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>

            ))}
          </select>
        </div>
        {/* IMAGEN ***********************************************************+**** */}
        <div className={styles.formGroup}>
          <label htmlFor="imagen">Imagen del Producto</label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            required
            ref={fileInputRef}
            onChange={(e) => {
              setFile(e.target.files[0]);
              handleImageUpload(e);
            }}
            className={styles.input}
          />
        </div>

        {ur_imagen && (
          <div className={styles.imagePreview}>
            <img src={ur_imagen} alt="Imagen cargada" className={styles.img} />
            <button className={`${styles.btnDelete}`} onClick={handleImageDelete}>
              Eliminar imagen
              <i className="bi bi-trash"></i>
            </button>
          </div>
        )}

        {/* ESTADO ********************************************************************** */}
        <div className={styles.formGroup}>
          <label htmlFor="estado">Estado del Producto:</label>
          <select id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className={styles.select}
            required>
            <option value="">Selecciona un estado</option>
            {getEstadoOptions()}
          </select>
        </div>


        <button type="submit" className={styles.btnSubmit}>Agregar Producto</button>
      </form>
    </div>
  );
};

export default FormProductos;