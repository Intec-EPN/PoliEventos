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
        if(esquemas && categorias){
            const esquemasCategorias = esquemas.map(esquema => {
                const categoriasFiltradas = categorias.filter( cat => cat.esquema_id === esquema.id);
                if(categoriasFiltradas.length>0){
                    return {
                        id: esquema.id,
                        nombre: esquema.nombre,
                        descripcion: esquema.descripcion,
                        visible: esquema.visible,
                        categorias: categoriasFiltradas                        
                    }
                };
                return{
                    id: esquema.id,
                    nombre: esquema.nombre,
                    descripcion: esquema.descripcion,
                    visible: esquema.visible,
                    categorias: []
                };
            });
            res.status(200).json(esquemasCategorias);
        }else{
            res.status(500).json({ error: 'No existen esquemas o categorías.' });
        }
    } catch (error) {
        console.error(`Error al obtener los esquemas y categorias: ${error}`);
        res.status(500).json({ error: 'Error al obtener los esquemas y categorias.' });
    }
};

module.exports = {obtenerEsquemasCategorias};

// [
//     {
//         "id": 1,
//         "nombre": "CES",
//         "descripcion": "Tipos de eventos correspondientes al CES",
//         "visible": true
//     },
//     {
//         "id": 2,
//         "nombre": "EPN",
//         "descripcion": "Tipos de eventos correspondientes al EPN",
//         "visible": true
//     }
// ]