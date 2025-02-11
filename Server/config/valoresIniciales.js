const bcrypt = require('bcrypt');
const DepartamentosModel = require("../modules/Administracion/models/Roles/departamentosModel");
const FacultadesModel = require("../modules/Administracion/models/Roles/facultadesModel");
const NivelesModel = require("../modules/Administracion/models/Roles/nivelesModel");
const PermisosModel = require("../modules/Administracion/models/Roles/permisosModel");
const RolesModel = require("../modules/Administracion/models/Roles/rolesModel");
const UsuarioRolModel = require("../modules/Auth/models/tablas-intermedias/usuario_rolesModel");
const UsuariosModel = require("../modules/Auth/models/usuariosModel");
const { sequelize } = require("./db");

const agregarValoresIniciales = async () => {
    const facultad = await FacultadesModel.count();
    if (facultad === 0) {
        await FacultadesModel.bulkCreate([
            { nombre: 'FIEE' }
        ]);
    }
    const departamentos = await DepartamentosModel.count();
    if (departamentos === 0) {
        await DepartamentosModel.bulkCreate([
            { nombre: 'DETRI', facultad_id: 1 },
            { nombre: 'DACI', facultad_id: 1 },
            { nombre: 'DEE', facultad_id: 1 }
        ]);
    }
    const niveles = await NivelesModel.count();
    if (niveles === 0) {
        await NivelesModel.bulkCreate([
            { nombre: 'Propio', color: '#FFF', icono: 'PersonIcon' },
            { nombre: 'Departamento', color: '#FFF', icono: 'ApartmentIcon' },
            { nombre: 'Facultad', color: '#FFF', icono: 'AccountBalanceIcon' },
        ]);
    }

    const permisos = await PermisosModel.count();
    if (permisos === 0) {
        await PermisosModel.bulkCreate([
            { accion: 'Gestionar evento', tooltip: 'Crear, editar, eliminar y descargar información privada de un evento propio.', bgColor: '#43b0db', nivel_id: '1' },
            { accion: 'Editar evento', tooltip: 'Editar evento que pertenece al mismo departamento.', bgColor: '#f09b3c', nivel_id: '2' },
            { accion: 'Eliminar evento', tooltip: 'Eliminar evento que pertenece al mismo departamento', bgColor: '#f09229', nivel_id: '2' },
            { accion: 'Generar reporte', tooltip: 'Generar reporte de los eventos del mismo departamento.', bgColor: '#dc8626', nivel_id: '2' },
            { accion: 'Descarga privada', tooltip: 'Descargar archivos asociados del mismo departamento.', bgColor: '#dc7400', nivel_id: '2' },
            { accion: 'Editar evento', tooltip: 'Editar evento que pertenezca a la facultad.', bgColor: '#4da93a', nivel_id: '3' },
            { accion: 'Eliminar evento', tooltip: 'Eliminar evento que pertenezca a la facultad', bgColor: '#248d18', nivel_id: '3' },
            { accion: 'Generar reporte', tooltip: 'Generar reporte de los eventos de la facultad.', bgColor: '#017b00', nivel_id: '3' },
            { accion: 'Descarga privada', tooltip: 'Descargar archivos asociados a la facultad.', bgColor: '#006f00', nivel_id: '3' }
        ]);
    }

    const rol = await RolesModel.findOne({ where: { nombre: 'Administrador' } });
    let rolAdmin = 0;
    if (!rol) {
        await sequelize.transaction(async (t) => {
            const nuevoRol = await RolesModel.create({
                nombre: 'Administrador',
                descripcion: 'Rol especial para el administrador',
                departamento_id: null,
                facultad_id: null,
            }, { transaction: t });

            rolAdmin = nuevoRol.id;
        });
    }


    const user = await UsuariosModel.findOne({ where: { nombre: 'admn' } });
    let userAdmin = 0;
    if (!user) {
        const hashedPassword = await bcrypt.hash(process.env.USERPASS, 10); 
        const admin = await UsuariosModel.create({
            nombre: process.env.USERADMIN,
            correo: process.env.USEREMAIL,
            password_hash: hashedPassword, 
        });
        userAdmin = admin.id;
    }

    if (rolAdmin && userAdmin) {
        const userRol = await UsuarioRolModel.findOne({ where: { usuario_id: userAdmin, rol_id: rolAdmin } });

        if (!userRol) {
            await UsuarioRolModel.create({
                usuario_id: userAdmin,
                rol_id: rolAdmin
            });
        }
    }
};


module.exports = agregarValoresIniciales;
