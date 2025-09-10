import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>Panel de Control</h2>
        </div>
        
        <div className="dashboard-body">
          <div className="user-info">
            <h3>Información del Usuario</h3>
            
            <div className="info-item">
              <span className="info-label">Usuario:</span>
              <span className="info-value">{user?.username}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Teléfono:</span>
              <span className="info-value">{user?.phone || 'No proporcionado'}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">ID de usuario:</span>
              <span className="info-value">{user?.id}</span>
            </div>
          </div>
          
          <div className="dashboard-actions">
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;