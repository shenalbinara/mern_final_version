import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    console.log('Authorization Header:', req.headers.authorization);

    let token;

    // Check if token is in the Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } 
    // Else, fallback to cookie
    else if (req.cookies && req.cookies.access_token) {
        token = req.cookies.access_token;
    }

    // If no token found
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, 'Unauthorized')); // fixed typo too
        }
        req.user = user;
        next();
    });
};
