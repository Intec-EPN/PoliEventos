const CategoriasModel = require("../../Administracion/models/Categorizaciones/categoriasModel");
const DepartamentosModel = require("../../Administracion/models/Roles/departamentosModel");
const EventosModel = require("../models/eventoModel");
const PersonasCargoModel = require("../models/personasCargoModel");
const ExpositoresModel = require("../models/expositoresModel");
const EventosCategoriasModel = require("../models/tablas-intermedias/evento_categoriasModel");
const EventosDepartamentosModel = require("../models/tablas-intermedias/evento_departamentosModel");
const EventosPersonasCargoModel = require("../models/tablas-intermedias/evento_personasModel");
const EventosExpositoresModel = require("../models/tablas-intermedias/evento_expositoresModel");
const UsuariosModel = require("../../Auth/models/usuariosModel");

const validarEvento = async (eventoCreacion) => {
    const errores = [];

    // Validar campos obligatorios
    if (!eventoCreacion.title) errores.push("El título es obligatorio.");
    if (!eventoCreacion.data.lugar) errores.push("El lugar es obligatorio.");
    if (!eventoCreacion.data.descripcion) errores.push("La descripción es obligatoria.");
    if (!eventoCreacion.data.personasACargo || eventoCreacion.data.personasACargo.length === 0) {
        errores.push("Debe agregar al menos una persona a cargo.");
    }
    if (!eventoCreacion.data.departamento || eventoCreacion.data.departamento.length === 0) {
        errores.push("Debe seleccionar al menos un departamento.");
    }
    if (!eventoCreacion.data.esquemaCategoria || eventoCreacion.data.esquemaCategoria.length === 0) {
        errores.push("Debe seleccionar al menos una categoría.");
    }
    return errores;
};

const crearEvento = async (req, res) => {
    const { usuarioId, eventoCreacion } = req.body;
    try {
        // Validar el evento
        const errores = await validarEvento(eventoCreacion);
        if (errores.length > 0) {
            return res.status(400).json({ message: 'Errores de validación', errores });
        }

        // Crear el evento
        const evento = await EventosModel.create({
            title: eventoCreacion.title,
            start: eventoCreacion.start,
            end: eventoCreacion.end,
            lugar: eventoCreacion.data.lugar,
            descripcion: eventoCreacion.data.descripcion,
            usuario_id: usuarioId,
            enlaces: eventoCreacion.data.enlaces
        });

        // Manejar personas a cargo
        for (const persona of eventoCreacion.data.personasACargo) {
            const personaCargo = await PersonasCargoModel.create({
                nombre: persona.nombre,
                correo: persona.mail,
            });

            await EventosPersonasCargoModel.create({
                evento_id: evento.id,
                persona_cargo_id: personaCargo.id,
            });
        }

        // Manejar expositores
        for (const expositor of eventoCreacion.data.expositores) {
            const expositorCargo = await ExpositoresModel.create({
                nombre: expositor.nombre,
                correo: expositor.mail,
            });

            await EventosExpositoresModel.create({
                evento_id: evento.id,
                expositor_id: expositorCargo.id,
            });
        }

        // Manejar esquema de categorías
        for (const esquemaCategoria of eventoCreacion.data.esquemaCategoria) {
            const categoria = await CategoriasModel.findOne({
                where: {
                    id: esquemaCategoria.categoriaId,
                    esquema_id: esquemaCategoria.esquemaId,
                },
            });

            if (categoria) {
                await EventosCategoriasModel.create({
                    evento_id: evento.id,
                    categoria_id: categoria.id,
                });
            }
        }

        // Manejar departamentos
        for (const departamentoId of eventoCreacion.data.departamento) {
            const departamento = await DepartamentosModel.findOne({
                where: {
                    id: departamentoId,
                },
            });

            if (departamento) {
                await EventosDepartamentosModel.create({
                    evento_id: evento.id,
                    departamento_id: departamento.id,
                });
            }
        }

        res.status(201).json({ message: 'Evento creado exitosamente', evento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el evento', error });
    }
};

const obtenerEventos = async (req, res) => {
    try {
        const eventos = await EventosModel.findAll();

        const eventosFormatted = [];
        for (const evento of eventos) {
            const usuario = await UsuariosModel.findByPk(evento.usuario_id);
            const personasCargo = await EventosPersonasCargoModel.findAll({
                where: { evento_id: evento.id },
                include: [{ model: PersonasCargoModel }]
            });

            const expositores = await EventosExpositoresModel.findAll({
                where: { evento_id: evento.id },
                include: [{ model: ExpositoresModel, as: 'expositore' }]
            });

            const categorias = await EventosCategoriasModel.findAll({
                where: { evento_id: evento.id },
                include: [{ model: CategoriasModel }]
            });

            const departamentos = await EventosDepartamentosModel.findAll({
                where: { evento_id: evento.id },
                include: [{ model: DepartamentosModel }]
            });

            eventosFormatted.push({
                id: evento.id,
                start: evento.start,
                end: evento.end,
                title: evento.title,
                usuarioId: evento.usuario_id,
                creador: usuario ? usuario.nombre : null, 
                data: {
                    lugar: evento.lugar,
                    descripcion: evento.descripcion,
                    departamento: departamentos.map(dep => dep.departamento_id) || [],
                    esquemaCategoria: categorias.map(cat => ({
                        categoriaId: cat.categoria_id,
                        esquemaId: cat.Categoria ? cat.Categoria.esquema_id : null,
                    })) || [],
                    personasACargo: personasCargo.map(persona => ({
                        nombre: persona.personas_cargo ? persona.personas_cargo.nombre : null,
                        mail: persona.personas_cargo ? persona.personas_cargo.correo : null,
                    })) || [],
                    expositores: expositores.map(expositor => ({
                        nombre: expositor.expositore ? expositor.expositore.nombre : null,
                        mail: expositor.expositore ? expositor.expositore.correo : null,
                    })) || [],
                    enlaces: evento.enlaces,
                    asistentes: evento.asistentes,
                    estudiantes: evento.estudiantes,
                    createdAt: evento.createdAt,
                },
            });
        }

        res.status(200).json(eventosFormatted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los eventos', error });
    }
};

const eliminarEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const evento = await EventosModel.findByPk(id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        await evento.destroy();

        res.status(200).json({ message: 'Evento eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el evento', error });
    }
};

const editarEvento = async (req, res) => {
    const { usuarioId, eventoEdicion } = req.body;
    const { id } = req.params;

    try {
        // Buscar el evento
        const evento = await EventosModel.findByPk(id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        // Actualizar el evento
        await evento.update({
            title: eventoEdicion.title,
            start: eventoEdicion.start,
            end: eventoEdicion.end,
            lugar: eventoEdicion.data.lugar,
            descripcion: eventoEdicion.data.descripcion,
            usuario_id: usuarioId,
            enlaces: eventoEdicion.data.enlaces
        });

        // Eliminar relaciones existentes
        await EventosPersonasCargoModel.destroy({ where: { evento_id: id } });
        await EventosExpositoresModel.destroy({ where: { evento_id: id } });
        await EventosCategoriasModel.destroy({ where: { evento_id: id } });
        await EventosDepartamentosModel.destroy({ where: { evento_id: id } });

        // Manejar personas a cargo
        for (const persona of eventoEdicion.data.personasACargo) {
            const personaCargo = await PersonasCargoModel.create({
                nombre: persona.nombre,
                correo: persona.mail,
            });

            await EventosPersonasCargoModel.create({
                evento_id: evento.id,
                persona_cargo_id: personaCargo.id,
            });
        }

        // Manejar expositores
        for (const expositor of eventoEdicion.data.expositores) {
            const expositorCargo = await ExpositoresModel.create({
                nombre: expositor.nombre,
                correo: expositor.mail,
            });

            await EventosExpositoresModel.create({
                evento_id: evento.id,
                expositor_id: expositorCargo.id,
            });
        }

        // Manejar esquema de categorías
        for (const esquemaCategoria of eventoEdicion.data.esquemaCategoria) {
            const categoria = await CategoriasModel.findOne({
                where: {
                    id: esquemaCategoria.categoriaId,
                    esquema_id: esquemaCategoria.esquemaId,
                },
            });

            if (categoria) {
                await EventosCategoriasModel.create({
                    evento_id: evento.id,
                    categoria_id: categoria.id,
                });
            }
        }

        // Manejar departamentos
        for (const departamentoId of eventoEdicion.data.departamento) {
            const departamento = await DepartamentosModel.findOne({
                where: {
                    id: departamentoId,
                },
            });

            if (departamento) {
                await EventosDepartamentosModel.create({
                    evento_id: evento.id,
                    departamento_id: departamento.id,
                });
            }
        }

        res.status(200).json({ message: 'Evento editado exitosamente', evento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al editar el evento', error });
    }
};


const agregarAsistentes = async (req, res) => {
    const { eventoId } = req.params;
    const { asistentes } = req.body;
    try {
        const evento = await EventosModel.findByPk(eventoId);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        await evento.update({ asistentes });

        res.status(200).json({ message: 'Asistentes agregados exitosamente', evento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar asistentes', error });
    }
};

const agregarEstudiantes = async (req, res) => {
    const { eventoId } = req.params;
    const { estudiantes } = req.body;
    try {
        const evento = await EventosModel.findByPk(eventoId);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        await evento.update({ estudiantes });

        res.status(200).json({ message: 'Estudiantes agregados exitosamente', evento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar asistentes', error });
    }
};

module.exports = { crearEvento, obtenerEventos, eliminarEvento, editarEvento, agregarAsistentes, agregarEstudiantes };