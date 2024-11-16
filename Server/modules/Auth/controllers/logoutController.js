
const logoutUsuario = async (req, res) => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.status(200).json({ message: 'Sesión cerrada.' });
    } catch (error) {
        console.error(`Error al cerrar sesión: ${error}`);
        res.status(401).json({ error: 'Error al cerrar la sesión.' });
    }
}

module.exports = { logoutUsuario };