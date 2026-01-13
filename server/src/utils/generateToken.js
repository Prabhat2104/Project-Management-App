import jwt from 'jsonwebtoken';

export const generateToken = (userID) => {
    return jwt.sign({ userId: userID }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });
}