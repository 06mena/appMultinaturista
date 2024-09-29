import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext'; // Importamos el contexto de autenticación

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Usamos isAuthenticated en lugar de verificar accessToken directamente

  // Si el administrador no está autenticado, redirigimos al login
  if (!isAuthenticated) {
    return <Navigate to="/loginAdmin" replace />;
  }

  // Si está autenticado, permitimos el acceso al contenido protegido
  return children;
};

export default ProtectedRoute;
