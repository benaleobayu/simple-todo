// utils/jwt.js
import jwt, {JwtPayload} from 'jsonwebtoken';

export const decodeJWT = (token: string) => {
    try {
        const decoded = jwt.decode(token) as JwtPayload;
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const saveTokenToLocalStorage = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        const decoded = decodeJWT(token);

    }
};

export const saveRefreshTokenToLocalStorage = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', token);
        const decoded = decodeJWT(token);
        if (decoded) {
            localStorage.setItem('user', JSON.stringify(decoded));
        }
    }
};


export const getUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    return null;
};