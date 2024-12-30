// Middleware para verificar si el usuario tiene algún rol.
const rolMiddleware = (req, res, next) => {
    const { roles } = req.user;

    if (roles.length < 1) {
        return res.status(403).json({ error: 'Acceso denegado.' });
    }
    next();
}

module.exports = rolMiddleware;