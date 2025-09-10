import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RegisterCredentials } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/FormalForm.css';

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
        const errors = err.response.data;
        if (typeof errors === 'object') {
          setFieldErrors(errors);
        } else {
          setError('Error en el registro. Por favor, intente nuevamente.');
        }
      } else {
        setError('Error de conexión. Por favor, intente nuevamente.');
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
    
    if (fieldErrors[e.target.name]) {
      setFieldErrors({
        ...fieldErrors,
        [e.target.name]: ''
      });
    }
    
    if (e.target.name === 'password2' && credentials.password !== e.target.value) {
      setFieldErrors({
        ...fieldErrors,
        password2: 'Las contraseñas no coinciden'
      });
    } else if (e.target.name === 'password2' && credentials.password === e.target.value) {
      setFieldErrors({
        ...fieldErrors,
        password2: ''
      });
    }
  };

  return (
    <div className="formal-container">
      <div className="formal-form-wrapper">
        <div className="formal-form-header">
          <h2>Crear Cuenta</h2>
          <p>Complete sus datos para registrarse en nuestra plataforma</p>
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
                className={fieldErrors.username ? "formal-form-input error" : "formal-form-input"}
                placeholder="Ingrese su nombre de usuario"
              />
              {fieldErrors.username && (
                <span className="formal-form-error">{fieldErrors.username}</span>
              )}
            </div>

            <div className="formal-form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className={fieldErrors.email ? "formal-form-input error" : "formal-form-input"}
                placeholder="ejemplo@correo.com"
              />
              {fieldErrors.email && (
                <span className="formal-form-error">{fieldErrors.email}</span>
              )}
            </div>

            <div className="formal-form-group">
              <label htmlFor="phone">Teléfono <span style={{color: '#7f8c8d', fontWeight: 'normal'}}>(opcional)</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={credentials.phone}
                onChange={handleChange}
                className="formal-form-input"
                placeholder="+1 234 567 8900"
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
                className={fieldErrors.password ? "formal-form-input error" : "formal-form-input"}
                placeholder="Mínimo 8 caracteres"
              />
              {fieldErrors.password && (
                <span className="formal-form-error">{fieldErrors.password}</span>
              )}
            </div>

            <div className="formal-form-group">
              <label htmlFor="password2">Confirmar Contraseña</label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={credentials.password2}
                onChange={handleChange}
                required
                className={fieldErrors.password2 ? "formal-form-input error" : "formal-form-input"}
                placeholder="Repita su contraseña"
              />
              {fieldErrors.password2 && (
                <span className="formal-form-error">{fieldErrors.password2}</span>
              )}
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
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>

            <div className="formal-form-footer">
              ¿Ya tiene una cuenta?{' '}
              <Link to="/login" className="formal-form-link">
                Iniciar sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;