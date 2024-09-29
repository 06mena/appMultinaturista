import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './css/tipAdmin.module.css'; // Asegúrate de tener el archivo CSS adecuado



const AdminTips = () => {
  const [tips, setTips] = useState([]);
  const [editingTip, setEditingTip] = useState(null); // Estado para manejar el tip en edición

  // Cargar los tips al montar el componente
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tips/')
      .then(response => {
        setTips(response.data);
      })
      .catch(error => console.error('Error al obtener los tips:', error));
  }, []);

  // Función para eliminar un tip
  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este tip será eliminado permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://127.0.0.1:8000/api/tips/${id}/`)
          .then(() => {
            setTips(tips.filter(tip => tip.id !== id));
            Swal.fire('¡Eliminado!', 'El tip ha sido eliminado.', 'success');
          })
          .catch(error => {
            console.error('Error al eliminar el tip:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el tip. Inténtalo de nuevo.', 'error');
          });
      }
    });
  };

  // Función para abrir el formulario de edición con los datos del tip seleccionado
  const handleEdit = (tip) => {
    setEditingTip(tip); // Establece el tip para edición
  };

  // Función para cerrar el modal de edición
  const handleCloseEdit = () => {
    setEditingTip(null); // Cierra el modal de edición
  };

  // Función para manejar la edición del tip
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTip = {
      ...editingTip,
      titulo: e.target.titulo.value,
      descripcion: e.target.descripcion.value,
      imagen_url: editingTip.imagen_url, // Asume que la imagen no se cambiará en este formulario
    };

    axios.put(`http://127.0.0.1:8000/api/tips/${editingTip.id}/, updatedTip`)
      .then(response => {
        setTips(tips.map(tip => (tip.id === editingTip.id ? response.data : tip)));
        setEditingTip(null);
        Swal.fire('¡Éxito!', 'El tip ha sido actualizado.', 'success');
      })
      .catch(error => {
        console.error('Error al actualizar el tip:', error);
        Swal.fire('Error', 'Hubo un problema al actualizar el tip. Inténtalo de nuevo.', 'error');
      });
  };

  return (
    <div>
      <div className={styles.adminTipsContainer}>
        <h2>Administrar Tips</h2>
        <div className={styles.tipsList}>
          {tips.map(tip => (
            <div className={styles.tipCard} key={tip.id}>
              <img src={tip.imagen_url} alt={tip.titulo} className={styles.tipImage} />
              <h3>{tip.titulo}</h3>
              <p>{tip.descripcion}</p>
              <div className={styles.buttonContainer}>
                <button className={styles.btnEdit} onClick={() => handleEdit(tip)}>Editar</button>
                <button className={styles.btnDelete} onClick={() => handleDelete(tip.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editingTip && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Editar Tip</h3>
            <form onSubmit={handleEditSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  id="titulo"
                  defaultValue={editingTip.titulo}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  defaultValue={editingTip.descripcion}
                  required
                  className={styles.textarea}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Imagen</label>
                <div className={styles.imagePreview}>
                  <img src={editingTip.imagen_url} alt="Imagen actual" className={styles.img} />
                </div>
              </div>
              <button type="submit" className={styles.btnSubmit}>Actualizar Tip</button>
              <button type="button" onClick={handleCloseEdit} className={styles.btnClose}>Cerrar</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTips;