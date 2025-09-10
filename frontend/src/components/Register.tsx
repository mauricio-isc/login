import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterCredentials } from '@/types';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: '',
    email: '',
    phone: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setFieldErrors({});
    
    // Validación básica del frontend
    if (credentials.password !== credentials.password2) {
      setFieldErrors({ password2: 'Las contraseñas no coinciden' });
      setIsLoading(false);
      return;
    }

    try {
      await register(credentials);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response?.data) {
        // Manejar errores de campo específicos
        const errors = err.response.data;
        if (typeof errors === 'object') {
          setFieldErrors(errors);
        } else {
          setError('Error en el registro');
        }
      } else {
        setError('Error en el registro');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (fieldErrors[e.target.name]) {
      setFieldErrors({
        ...fieldErrors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {fieldErrors.username && (
            <div style={{ color: 'red', fontSize: '14px' }}>{fieldErrors.username}</div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {fieldErrors.email && (
            <div style={{ color: 'red', fontSize: '14px' }}>{fieldErrors.email}</div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="phone">Teléfono (opcional):</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={credentials.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {fieldErrors.password && (
            <div style={{ color: 'red', fontSize: '14px' }}>{fieldErrors.password}</div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password2">Confirmar Contraseña:</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={credentials.password2}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {fieldErrors.password2 && (
            <div style={{ color: 'red', fontSize: '14px' }}>{fieldErrors.password2}</div>
          )}
        </div>

        {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none',
            opacity: isLoading ? 0.7 : 1,
            marginBottom: '15px'
          }}
        >
          {isLoading ? 'Creando cuenta...' : 'Registrarse'}
        </button>

        <div style={{ textAlign: 'center' }}>
          <span>¿Ya tienes una cuenta? </span>
          <Link to="/login" style={{ color: '#2196F3' }}>
            Inicia sesión aquí
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;