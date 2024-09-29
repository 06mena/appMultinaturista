import React from 'react';
import styles from './css/categorias.module.css';
import { Link } from 'react-router-dom';

const Categorias = () => {
  const categorias = [
    { id: 1, nombre: 'Alimentos', imgUrl: 'https://res.cloudinary.com/dj1cegfhf/image/upload/v1726528004/Container_lvjtgx.png' },
    { id: 2, nombre: 'Cosméticos Naturales', imgUrl: 'https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823310/cosmeticos_zbzrsj.png' },
    { id: 3, nombre: 'Esencias', imgUrl: 'https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823338/esencias_ugxisw.png' },
    { id: 4, nombre: 'Homeopáticos', imgUrl: 'https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823382/homeopaticos_mvua0b.png' },
    { id: 5, nombre: 'Fitoterapéuticos', imgUrl: 'https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823410/fitoterapeuticos_beseou.png' },
    { id: 6, nombre: 'Medicamentos', imgUrl: 'https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823432/medicamentos_j3h6g9.png' },
    { id: 7, nombre: 'Suplementos', imgUrl: 'https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823463/suplementos_zi0exq.png' },
    { id: 8, nombre: 'Aromaterapia', imgUrl: 'https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823486/aromaterapia_tewbkt.png' },
  ];

  return (
    <div className={styles.principalCategorias}>
      <div className={styles.tituloCategoria}>
        <h2>Categorías</h2>
      </div>
      <div className={styles.categorias}>
        {categorias.map(categoria => (
          <Link key={categoria.id} to={`/categoria/${categoria.id}`}>
            <img src={categoria.imgUrl} alt={categoria.nombre} className={styles.imagen} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
