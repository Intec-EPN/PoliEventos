const { sequelize } = require("../../../../config/db");
const EventosCategoriasModel = require("../../../GestionEventos/models/tablas-intermedias/evento_categoriasModel");
const CategoriasModel = require("../../models/Categorizaciones/categoriasModel");
const EsquemasCategorizacionModel = require("../../models/Categorizaciones/esquemasModel");
const { Op } = require('sequelize'); 

const obtenerEsquemasCategorias = async (req, res) => {
    try {
        const esquemas = await EsquemasCategorizacionModel.findAll({
            attributes: ['id', 'nombre', 'descripcion', 'visible']
        });

        const categorias = await CategoriasModel.findAll({
            attributes: ['id', 'nombre', 'visible', 'esquema_id']
        });

        const eventosCategorias = await EventosCategoriasModel.findAll({
            attributes: ['categoria_id']
        });

        if (esquemas && categorias) {
            const esquemasCategorias = esquemas.map(esquema => {
                const categoriasFiltradas = categorias.filter(cat => cat.esquema_id === esquema.id);
                const esquemaUsado = categoriasFiltradas.some(cat => eventosCategorias.some(evCat => evCat.categoria_id === cat.id));
                return {
                    id: esquema.id,
                    nombre: esquema.nombre,
                    descripcion: esquema.descripcion,
                    visible: esquema.visible,
                    usado: esquemaUsado,
                    categorias: categoriasFiltradas.map(cat => {
                        const categoriaUsada = eventosCategorias.some(evCat => evCat.categoria_id === cat.id);
                        return {
                            id: cat.id,
                            nombre: cat.nombre,
                            visible: cat.visible,
                            usado: categoriaUsada,
                            esquema_id: cat.esquema_id
                        };
                    })
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
        // Verificar si el nombre ya está en uso por otro esquema
        const esquemaExistente = await EsquemasCategorizacionModel.findOne({
            where: {
                nombre,
                id: { [Op.ne]: id } // Excluir el esquema actual
            }
        });

        if (esquemaExistente) {
            return res.status(400).json({ message: 'El nombre ingresado ya está en uso.' });
        }

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
                    // Si la categoría tiene un id, significa que estoy actualizando una existente:
                    await CategoriasModel.update(
                        {
                            nombre: categoria.nombre,
                            visible: categoria.visible,
                            esquema_id: id
                        },
                        { where: { id: categoria.id }, transaction: t }
                    );
                } else {
                    // Si no tiene id significa que es una nueva categoría, por lo que hay que crearla:
                    await CategoriasModel.create(
                        {
                            nombre: categoria.nombre,
                            visible: categoria.visible,
                            esquema_id: id
                        },
                        { transaction: t }
                    );
                }
            }
        });

        res.status(200).json({ message: "Esquema y categorías actualizados correctamente." });

    } catch (error) {
        console.error(`Error al actualizar el esquema y categorías: ${error}`);
        res.status(500).json({ error: "Error al actualizar el esquema y categorías." });
    }
};


const crearEsquemasCategorias = async (req, res) => {
    const { nombre, descripcion, visible } = req.body;

    try {
        // Verificar si el esquema ya existe:
        const esquemaExistente = await EsquemasCategorizacionModel.findOne({ where: { nombre } });
        if (esquemaExistente) {
            return res.status(400).json({ message: 'El esquema de categorización ya existe.' });
        }

        // Iniciar transacción que asegure la operación (create)
        await sequelize.transaction(async (t) => {
            // Creo el esquema principal con categorías vacías
            const nuevoEsquema = await EsquemasCategorizacionModel.create(
                {
                    nombre,
                    descripcion,
                    visible,
                    categorias: [] // Inicializar categorías como un arreglo vacío
                },
                { transaction: t } // Transacción para asegurar la atomicidad
            );
        });

        res.status(201).json({ message: "Esquema creado correctamente." });
    } catch (error) {
        console.error(`Error al crear el esquema: ${error}`);
        res.status(500).json({ error: "Error al crear el esquema." });
    }
};

const cambiarVisibilidadEsquema = async (req, res) => {
    const { id } = req.params;
    try {
        // Inicio transacción par acuidar los datos
        await sequelize.transaction(async (t) => {
            // Recupero el esquema en específico
            const esquema = await EsquemasCategorizacionModel.findByPk(id, { transaction: t });
            if (!esquema) {
                return res.status(404).json({ error: 'Esquema no encontrado' });
            }
            // Si es que si está el esquema, cambio su estado:
            esquema.visible = !esquema.visible;
            await esquema.save({ transaction: t });
        });
        res.json({ message: 'Visibilidad correctamente actualizada.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la visibilidad' });
    }
};
const cambiarVisibilidadCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        // Inicio transacción par acuidar los datos
        await sequelize.transaction(async (t) => {
            // Recupero la categoria en específico
            const categoria = await CategoriasModel.findByPk(id, { transaction: t });
            if (!categoria) {
                return res.status(404).json({ error: 'Esquema no encontrado' });
            }
            // Si es que si está el esquema, cambio su estado:
            categoria.visible = !categoria.visible;
            await categoria.save({ transaction: t });
        });
        res.json({ message: 'Visibilidad correctamente actualizada.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la visibilidad' });
    }
};

const eliminarEsquemaCategorias = async (req, res) => {
    const { id } = req.params;
    // TODO VALIDAR QUE NO EXISTAN EVENTOS CON RELACION A ALGUNA CATEGORIA DE ESTE ESQUEMA
    try {
        // Verificamos si el esquema existe antes de intentar eliminar
        const esquemaExistente = await EsquemasCategorizacionModel.findByPk(id);
        
        if (!esquemaExistente) {
            return res.status(404).json({ message: 'Esquema no encontrado.' });
        }

        // Llamar al procedimiento almacenado para eliminar el esquema (si es que existe).
        await sequelize.query("CALL EliminarEsquemaCategorizacion(:esquemaId)", {
            replacements: { esquemaId: id },
        });

        // Si llegamos aquí, significa que la eliminación se realizó
        return res.status(200).json({ message: 'Esquema eliminado correctamente.' });

    } catch (error) {
        console.error(`Error al eliminar el esquema de categorización: ${error}`);
        res.status(500).json({ error: "Error al eliminar el esquema de categorización." });
    }
};


const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    
    // TODO VALIDAR QUE NO EXISTAN EVENTOS CON RELACIÓN A ESTA CATEGORÍA
    
    try {
        // Verificamos si la categoría existe antes de intentar eliminar
        const categoriaExistente = await CategoriasModel.findByPk(id);
        
        if (!categoriaExistente) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }

        // Llamar al procedimiento almacenado para eliminar la categoría
        await sequelize.query("CALL EliminarCategoria(:categoriaId)", {
            replacements: { categoriaId: id },
        });

        // Si llegamos aquí, significa que la eliminación se realizó
        return res.status(200).json({ message: 'Categoría eliminada correctamente.' });

    } catch (error) {
        console.error(`Error al eliminar la categoría: ${error}`);
        res.status(500).json({ error: "Error al eliminar la categoría." });
    }
};

const obtenerEsquemasCategoriasCalendario = async (req, res) => {
    try {
        const esquemas = await EsquemasCategorizacionModel.findAll({
            attributes: ['id', 'nombre', 'visible'],
            // where: { visible: true }
        });

        const categorias = await CategoriasModel.findAll({
            attributes: ['id', 'nombre', 'esquema_id', 'visible'],
            // where: { visible: true }
        });

        if (esquemas && categorias) {
            const esquemasCategorias = esquemas.map(esquema => {
                const categoriasFiltradas = categorias.filter(cat => cat.esquema_id === esquema.id);
                return {
                    esquemaId: esquema.id,
                    esquemaNombre: esquema.nombre,
                    visible: esquema.visible,
                    categorias: categoriasFiltradas.map(cat => ({
                        categoriaId: cat.id,
                        categoriaNombre: cat.nombre,
                        visible: cat.visible
                    }))
                };
            });

            res.status(200).json(esquemasCategorias);
        } else {
            res.status(404).json({ error: 'No se encontraron esquemas o categorías visibles.' });
        }
    } catch (error) {
        console.error(`Error al obtener esquemas y categorías: ${error}`);
        res.status(500).json({ error: 'Error al obtener esquemas y categorías.' });
    }
};

module.exports = { 
    obtenerEsquemasCategorias, 
    atualizarEsquemasCategorias, 
    crearEsquemasCategorias, 
    cambiarVisibilidadEsquema, 
    cambiarVisibilidadCategoria, 
    eliminarEsquemaCategorias,
    eliminarCategoria,
    obtenerEsquemasCategoriasCalendario
};
