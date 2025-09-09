import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext'
import { LoginCredentials } from '@/types';

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: '',
        password: ''
    })

    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try{
            await login(credentials);
        }catch(err: any){
            setError(err.response?.data?.detail || 'Error al iniciar sesion');
        }finally{
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return(
<div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Iniciar Sesión</h2>
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
        </div>
        {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none',
            opacity: isLoading ? 0.7 : 1 
          }}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

    
export default Login;