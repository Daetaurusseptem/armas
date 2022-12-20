"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeOrReadPermissions = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const usuarios_1 = require("../models/usuarios");
const shortid_1 = __importDefault(require("shortid"));
const areas_1 = require("../models/areas");
const permisos_1 = require("../models/permisos");
const getUsers = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaUsuarios = yield usuarios_1.usuarios.findAll({ include: { model: areas_1.areas } });
        return resp.json({
            ok: true,
            usuarios: listaUsuarios
        });
    }
    catch (error) {
        console.log(error);
        return resp.json({
            ok: false,
            msg: error
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUsuario } = req.params;
        const Usuario = yield usuarios_1.usuarios.findOne({ where: { id: idUsuario }, include: { model: areas_1.areas } });
        if (!Usuario) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se encontro el usuario con id' + idUsuario
            });
        }
        return resp.json({
            ok: true,
            usuario: Usuario
        });
    }
    catch (error) {
        console.log(error);
        return resp.json({
            ok: false,
            msg: 'Hubo un error inesperado: ' + error
        });
    }
});
exports.getUser = getUser;
const createUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.id = shortid_1.default.generate();
        req.body.status = true;
        const nuevoUsuario = req.body;
        console.log(nuevoUsuario);
        const existeId = yield usuarios_1.usuarios.findByPk(req.body.id);
        const existeUser = yield usuarios_1.usuarios.findOne({ where: { usuario: req.body.usuario } });
        console.log(existeUser);
        if ((existeUser === null || existeUser === void 0 ? void 0 : existeUser.get('usuario')) == req.body.usuario) {
            console.log(existeUser);
            return resp.json({
                ok: false,
                msg: 'usuario ya existe'
            });
        }
        //password encrypt
        // const salt = bcrypt.genSaltSync();
        // const passNotEncrypted = req.body.password
        // req.body.password = bcrypt.hashSync(passNotEncrypted, salt);
        const crearUsuario = yield usuarios_1.usuarios.create(nuevoUsuario);
        crearUsuario.save();
        console.log(req.body);
        return resp.status(200).json({
            ok: true,
            body: req.body
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: true,
            msg: `error inesperado contacte a un administrador ${error}`
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const userExiste = yield usuarios_1.usuarios.findByPk(userId);
        if (!userExiste) {
            return resp.status(400).json({
                ok: false,
                msg: 'Este empleado no existe'
            });
        }
        console.log(req.body);
        const updateUser = yield usuarios_1.usuarios.update(req.body, { where: { id: userId } });
        return resp.status(200).json({
            ok: true,
            msg: 'Usuario Actualizado'
        });
    }
    catch (error) {
        return resp.status(400).json({
            ok: false,
            msg: 'Error inesperado' + error
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUsuario } = req.params;
        const usuarioDb = yield usuarios_1.usuarios.findByPk(idUsuario);
        if (!usuarioDb) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se encontró el tipo de expedientes'
            });
        }
        yield usuarioDb.destroy();
        return resp.status(200).json({
            ok: true,
            msg: 'El usuario ha sido eliminado exitosamente'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado el usuario que desea eliminar contiene registros'
        });
    }
});
exports.deleteUser = deleteUser;
const writeOrReadPermissions = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuarioId, areaId } = req.params;
        console.log(areaId);
        const userDB = yield usuarios_1.usuarios.findByPk(usuarioId);
        const areaDB = yield areas_1.areas.findByPk(areaId);
        if (!userDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario No existe'
            });
        }
        if (!areaDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'Area No existe'
            });
        }
        const comprobarPermiso = yield permisos_1.permisos.findOne({ where: { areaId, usuarioId } });
        if (!comprobarPermiso) {
            return resp.status(404).json({
                ok: false,
                msg: 'Permisos no disponibles'
            });
        }
        const tipo = comprobarPermiso.get('tipo');
        if (tipo == 'e') {
            return resp.status(200).json({
                ok: true,
                tipo: 'e'
            });
        }
        else if (tipo == 'l') {
            return resp.status(200).json({
                ok: true,
                tipo: 'l'
            });
        }
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: `Hubo un error inesperado: ${error}`
        });
    }
});
exports.writeOrReadPermissions = writeOrReadPermissions;
