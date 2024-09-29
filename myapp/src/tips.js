import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/tips.module.css';

const Tips = ({ maxTips = 3, newTip }) => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tips/')
      .then(response => {
        // Limitar el número de tips si maxTips está definido
        const tipsLimitados = maxTips ? response.data.slice(0, maxTips) : response.data;
        setTips(tipsLimitados);
      })
      .catch(error => console.error(error));
  }, [maxTips]);

  // Efecto para agregar el nuevo tip a la lista
  useEffect(() => {
    if (newTip) {
      setTips(prevTips => [newTip, ...prevTips.slice(0, maxTips - 1)]);
    }
  }, [newTip, maxTips]);

  return (
    <div className={styles.tipsSection}>
      <h2>Tips</h2>
      <div className={styles.tipsContainer}>
        {tips.map((tip) => (
          <div className={styles.tip} key={tip.id}>
            <img
              src={tip.imagen_url}
              alt={tip.titulo}
              className={styles.tipImage}
            />
            <h3>{tip.titulo}</h3>
            <p>{tip.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;