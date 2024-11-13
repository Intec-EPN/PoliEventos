const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado.' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        // Almacenar la información del usuario decodificada en la solicitud
        req.user = decoded;
        console.log(decoded);
        // Continuar con la siguiente función de middleware o ruta
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Acceso no autorizado.' });
    }
};

module.exports = authMiddleware;