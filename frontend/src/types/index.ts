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

export interface RegisterCredentials{
    username: string;
    email: string;
    phone?: string;
    password: string;
    password2: string;
}