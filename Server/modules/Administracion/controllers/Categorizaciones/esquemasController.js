const { sequelize } = require("../../../../config/db");
const CategoriasModel = require("../../models/Categorizaciones/categoriasModel");
const EsquemasCategorizacionModel = require("../../models/Categorizaciones/esquemasModel");

const obtenerEsquemasCategorias = async (req, res) => {
    try {
        const esquemas = await EsquemasCategorizacionModel.findAll({
            attributes: ['id', 'nombre', 'descripcion', 'visible']
        });

        const categorias = await CategoriasModel.findAll({
            attributes: ['id', 'nombre', 'visible', 'esquema_id']
        });
        if (esquemas && categorias) {
            const esquemasCategorias = esquemas.map(esquema => {
                const categoriasFiltradas = categorias.filter(cat => cat.esquema_id === esquema.id);
                if (categoriasFiltradas.length > 0) {
                    return {
                        id: esquema.id,
                        nombre: esquema.nombre,
                        descripcion: esquema.descripcion,
                        visible: esquema.visible,
                        categorias: categoriasFiltradas
                    }
                };
                return {
                    id: esquema.id,
                    nombre: esquema.nombre,
                    descripcion: esquema.descripcion,
                    visible: esquema.visible,
                    categorias: []
                };
            });
            res.status(200).json(esquemasCategorias);
        } else {
            res.status(500).json({ error: 'No existen esquemas o categorías.' });
        }
    } catch (error) {
        console.error(`Error al obtener los esquemas y categorias: ${error}`);
        res.status(500).json({ error: 'Error al obtener los esquemas y categorias.' });
    }
};


const atualizarEsquemasCategorias = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, visible, categorias } = req.body;

    try {
        // Iniciar transacción que asegure la operación (update)
        await sequelize.transaction(async (t) => {
            // Actualizo el esquema principal:
            await EsquemasCategorizacionModel.update(
                { nombre, descripcion, visible },
                { where: { id }, transaction: t }
            );

            // Actualizo o creo categorías
            for (const categoria of categorias) {
                if (categoria.id) {
                    // Si la categoría tiene un id, significa que estoy actualizando uno:
                    await CategoriasModel.update(
                        {
                            nombre: categoria.nombre,
                            visible: categoria.visible,
                            esquema_id: id
                        },
                        { where: { id: categoria.id }, transaction: t }
                    );
                } else {
                    // Si no tiene id significa que es una nueva categoríá, por lo que hay que crear.
                    await CategoriasModel.create(
                        {
                            nombre: categoria.nombre,
                            visible: categoria.visible,
                            esquema_id: id
                        },
                        { transaction: t }
                    );
                }
            };
        });
        res.status(200).json({ message: "Esquema y categorías actualizadas correctamente." });
    } catch (error) {
        console.error(`Error al actualizar el esquema y categorías: ${error}`);
        res.status(500).json({ error: "Error al actualizar el esquema y categorías." });
    }
};


module.exports = { obtenerEsquemasCategorias, atualizarEsquemasCategorias };
