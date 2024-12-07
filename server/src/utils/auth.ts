import jwt from 'jsonwebtoken';
//import unknown from '../config/connection';

export const authenticateToken = ({ req }: unknown) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
    
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }
    
    if (!token) {
        return req;
    }
    
    try {
        const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '24h' });
        req.user = data;
    } catch {
        console.log('Invalid token');
    }
    
    return req;
    };

    export const signToken = ( email: string, username: string, _id: unknown ) => {
        const payload = { email, username, _id };
        const secretKey: unknown = process.env.JWT_SECRET_KEY;

        return jwt.sign({ data: payload }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    };

    export class AuthenticationError extends Error {
        constructor(message: string) {
            super(message: ['Not authenticated']);
        }
    };