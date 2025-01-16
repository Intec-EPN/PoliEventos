const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Header de autorización:",authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token recibido:", token); 
    if (!token) {
        return res.status(400).json({ message: 'Acceso no autorizado T.' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
    console.log("Token decodificado:", decoded); 
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error); // Agregar log para verificar el error
        return res.status(400).json({ message: 'Acceso no autorizado. A', error: error });
    }
};

module.exports = authMiddleware;