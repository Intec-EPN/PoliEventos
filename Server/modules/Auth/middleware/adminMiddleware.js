// Middleware para verificar si el usuario es administrador.
const adminMiddleware = (req, res, next) => {
    const { nombre } = req.user;

    if (nombre !== 'admn') {
        return res.status(403).json({ error: 'Acceso denegado.' });
    }

    next();
};

module.exports = adminMiddleware;