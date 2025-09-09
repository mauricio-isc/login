import react from 'react';
import { useAuth } from '@/contexts/AuthContext';


const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Bienvenido, {user?.username}!</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Información del usuario:</h3>
        <p><strong>Usuario:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Teléfono:</strong> {user?.phone || 'No proporcionado'}</p>
      </div>
      <button 
        onClick={handleLogout}
        style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none' }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Dashboard;