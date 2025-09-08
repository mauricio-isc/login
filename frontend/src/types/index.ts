export interface User {
    id: number;
    username: string;
    email: string;
    phone?: string;
}

export interface AuthResponse {
    user: User;
    access: string;
    refresh: string;
}

export interface LoginCredentials{
    username: string;
    password: string;
}