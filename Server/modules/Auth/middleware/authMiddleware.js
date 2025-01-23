const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'Acceso no autorizado T.' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error); // Agregar log para verificar el error
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'El token ha expirado.', expiredAt: error.expiredAt });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'El token es inválido o está mal formado.' });
        }
        return res.status(400).json({ message: 'Acceso no autorizado.', error: error });
    }
};

module.exports = authMiddleware;