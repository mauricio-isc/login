import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginCredentials } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/FormalForm.css';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión. Verifique sus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="formal-container">
      <div className="formal-form-wrapper">
        <div className="formal-form-header">
          <h2>Iniciar Sesión</h2>
          <p>Ingrese a su cuenta para acceder al sistema</p>
        </div>
        
        <div className="formal-form-body">
          <form onSubmit={handleSubmit}>
            <div className="formal-form-group">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="formal-form-input"
                placeholder="Ingrese su nombre de usuario"
              />
            </div>

            <div className="formal-form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="formal-form-input"
                placeholder="Ingrese su contraseña"
              />
            </div>

            {error && (
              <div className="formal-form-error" style={{textAlign: 'center', marginBottom: '15px'}}>
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="formal-form-button"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>

            <div className="formal-form-footer">
              ¿No tiene una cuenta?{' '}
              <Link to="/register" className="formal-form-link">
                Regístrese aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;