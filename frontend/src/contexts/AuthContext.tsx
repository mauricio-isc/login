import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, LoginCredentials } from '@/types'
import { authAPI } from '@/services/api'


interface AuthContextType {
    user: User | null;  
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
        return context;
    }
};

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('accessToken');
            const storedUser = localStorage.getItem('user');

            if(token && storedUser){
                try{
                    //verificar si el token es valido obteniendo la informacion del usuario
                    const userData = await authAPI.getUser();
                    setUser(userData);
                }catch(user){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                }
            }
            setIsLoading(false);
        };
    
        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials)=> {
        try{
            const response = await authAPI.login(credentials);
            const { user, access, refresh } = response;

            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('user', JSON.stringify(user));

            setUser(user);
        }catch(error){
            throw error;
        }
    };

    const logout = async () => {
        try{
            await authAPI.logout();
        }catch(error){
            console.error('Error during logout: ', error);
        }finally{
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    const value = {
        user,
        login,
        logout,
        isLoading,
    };

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    );
};