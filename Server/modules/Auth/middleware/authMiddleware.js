const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("Token recibido:", token); // Agregar log para verificar el token recibido
    if (!token) {
        return res.status(400).json({ message: 'Acceso no autorizado T.' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
    console.log("Token decodificado:", decoded); // Agregar log para verificar el token decodificado
        // Almacenar la información del usuario decodificada en la solicitud
        req.user = decoded;
        // Continuar con la siguiente función de middleware o ruta
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error); // Agregar log para verificar el error
        return res.status(400).json({ message: 'Acceso no autorizado. A', error: error });
    }
};

module.exports = authMiddleware;