import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './css/formTips.module.css'; // Asegúrate de tener el archivo CSS adecuado
 
const FormTips = ({ onTipAdded }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [file, setFile] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (isUploading) {
      Swal.fire({
        title: "¡Por favor espera mientras se carga la imagen!",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.stopTimer();
        }
      });
      return;
    }
 
    if (!titulo || !descripcion || !imagenUrl) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos y sube una imagen.'
      });
      return;
    }
 
    axios.post('http://127.0.0.1:8000/api/tips/', {
      titulo,
      descripcion,
      imagen_url: imagenUrl,
    })
      .then(response => {
        setTitulo('');
        setDescripcion('');
        setImagenUrl(null);
        setFile(null);
        Swal.fire({
          title: "¡Éxito!",
          text: "El nuevo tip ha sido agregado",
          icon: "success"
        });
 
        // Llamar a la función onTipAdded para actualizar la lista de tips
        if (onTipAdded) {
          onTipAdded(response.data); // Pasar el nuevo tip a la vista principal
        }
      })
      .catch(error => {
        console.log(error);
        Swal.fire({

          title: 'Error',
          text: 'Hubo un problema al enviar los datos. Por favor, inténtalo de nuevo.',
          icon: 'error'
        });
      });
  };
 
  const handleImageUpload = async (e) => {
    try {
      setIsUploading(true);
      const file = e.target.files[0];
      if (!file) return;
 
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "imagen_tips");
 
      const response = await axios.post("https://api.cloudinary.com/v1_1/jimena123/image/upload", data);
 
      setImagenUrl(response.data.secure_url);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setIsUploading(false);
    }
  };
 
  const handleImageDelete = () => {
    setImagenUrl(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
 
  return (
    <div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Agregar nuevo Tip</h2>
 
          <div className={styles.formGroup}>
            <label htmlFor="titulo">Título del Tip</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título del tip"
              required
              className={styles.input}
            />
          </div>
 
          <div className={styles.formGroup}>
            <label htmlFor="descripcion">Descripción del Tip</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción del tip"
              rows="3"
              className={styles.textarea}
            />
          </div>
 
          <div className={styles.formGroup}>
            <label htmlFor="imagen">Imagen del Tip</label>
            <input
              type="file"
              id="imagen"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                setFile(e.target.files[0]);
                handleImageUpload(e);
              }}
              className={styles.input}
            />
          </div>
 
          {imagenUrl && (
            <div className={styles.imagePreview}>
              <img src={imagenUrl} alt="Imagen cargada" className={styles.img} />
              <button type="button" className={styles.btnDelete} onClick={handleImageDelete}>
                Eliminar imagen
              </button>
            </div>
          )}
 
          <button type="submit" className={styles.btnSubmit}>Agregar Tip</button>
        </form>
      </div>
    </div>
  );
};
 
export default FormTips;