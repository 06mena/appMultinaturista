import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
  const [error, setError] = useState(null);

  const inactivityTime = 20 * 60 * 1000;

  useEffect(() => {
    const handleInactivity = () => {
      logout();
    };

    let timer = setTimeout(handleInactivity, inactivityTime);

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleInactivity, inactivityTime);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [inactivityTime]);


  const isAuthenticated = !!accessToken; // Verificar si el usuario está autenticado

  // Función para iniciar sesión
  const login = async (username, password) => {
    console.log('Intentando iniciar sesión');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),  // Usamos username en lugar de email
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.detail || 'Credenciales inválidas'}`);
      }

      const data = await response.json();
      console.log('Login exitoso, tokens:', data);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setError(null); // Limpiar errores si el login es exitoso
    } catch (error) {
      setError(error.message); // Almacenar el mensaje de error
      console.error(error);
    }
  };

  // Función para refrescar el access token
  const refreshAccessToken = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('No se pudo refrescar el token');
      }

      const data = await response.json();
      setAccessToken(data.access);
      localStorage.setItem('accessToken', data.access);
      setError(null); // Limpiar errores si el token se refresca correctamente
    } catch (error) {
      setError(error.message); // Almacenar el mensaje de error
      console.error(error);
      logout(); // Cerrar sesión si el refresco del token falla
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setAccessToken('');
    setRefreshToken('');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, refreshAccessToken, logout, error, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);