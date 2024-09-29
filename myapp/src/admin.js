import React, { useState } from 'react';
import { useAuth } from './authContext'; // Importa el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Hook para redirección
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './css/login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth(); // Extraemos el login y error desde el contexto
  const navigate = useNavigate(); // Hook para redirigir al administrador tras login exitoso

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    // Intentamos iniciar sesión con las credenciales proporcionadas
    await login(username, password);

    // Si no hay error, redirigimos al administrador a la página protegida
    if (!error) {
      navigate('/Admin'); // Redirigir a la ruta protegida (ejemplo: agregar productos)
    }
  };

  return (
    <div className={`${styles.formContainer} container`}>
      <div className={`${styles.formContainerDos} container`}>


        <div className={styles.cajaDeLaCosa}>
          {/* ------------------------------------------- LADO DECORATIVO ---------------------------------------- */}
          <div className={styles.decoracion}>
            <img src='https://res.cloudinary.com/dwsoxf7zi/image/upload/v1726782126/imgLogin_q90zeh.png' alt='Login'></img>
          </div>



          {/* ---------------------------------------- FORMULARIO ---------------------------------------- */}
          <div className={styles.loginCaja}>
            <h1 className={styles.tituloAcceder}>Acceder</h1>
            <form onSubmit={handleSubmit}>
              <div className={`${styles.mb4} form-group`}>
                <label htmlFor="exampleInputUsername" className={styles.formLabel}>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  id="exampleInputUsername"
                  required
                />
              </div>
              <div className={`${styles.mb4} form-group`}>
                <label htmlFor="exampleInputPassword1" className={styles.formLabel}>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <button type="submit" className={`btn btn-primary ${styles.botonAcceso}`}>Acceso</button>

              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

          </div>

        </div>
      </div>
    </div>

  );
};

export default Admin;