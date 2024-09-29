import React, { useState } from 'react';
import { useAuth } from './authContext';
import Formulario from './admin';
import BarraPrincipal from './barraPrincipal';
// import Footer from './footer';
// import './css/login.css'
 
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
 
  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);  // Cambiado a 'username'
  };
 
  return (
    <div>
      <BarraPrincipal />
      <Formulario
        username={username}
        password={password}
        error={error}
        handleSubmit={handleSubmit}
        setUsername={setUsername}  // Cambiado a 'setUsername'
        setPassword={setPassword}
      />
    </div>
  );
};
 
export default Login;