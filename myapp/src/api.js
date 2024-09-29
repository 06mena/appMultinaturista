import axios from 'axios';

export const getProductosRelacionados = (id) => {
  return axios.get(`http://127.0.0.1:8000/api/productos/${id}/relacionados/`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al obtener productos relacionados:', error);
      throw error;
    });
};
