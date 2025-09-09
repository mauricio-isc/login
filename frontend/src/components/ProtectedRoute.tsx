import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, isLoading } = useAuth();

    if(isLoading){
        return <div>Cargando...</div>;
    }

    return user ? <>{children}</>: <Navigate to="/login" replace />;
};

export default ProtectedRoute;