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
exports.login = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const usuarios_1 = require("../models/usuarios");
const shortid_1 = __importDefault(require("shortid"));
const permisos_1 = require("../models/permisos");
const getUsers = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaUsuarios = yield usuarios_1.usuarios.findAll({ include: { association: permisos_1.permisos } });
        return resp.json({
            ok: true,
            usuarios: listaUsuarios
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            msg: error
        });
    }
});
exports.getUsers = getUsers;
const createUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.id = shortid_1.default.generate();
        req.body.status = true;
        const nuevoUsuario = req.body;
        console.log(nuevoUsuario);
        const existeId = yield usuarios_1.usuarios.findByPk(req.body.id);
        if (existeId) {
            return resp.json({
                ok: true,
                body: req.body
            });
        }
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
            msg: `error inesperado ${error}`
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const userExiste = yield usuarios_1.usuarios.findByPk(userId);
    if (!userExiste) {
        return resp.status(400).json({
            ok: false,
            msg: 'Este empleado no existe'
        });
    }
    const updateUser = yield usuarios_1.usuarios.update({ where: { empresaId: userId } }, req.body);
});
exports.updateUser = updateUser;
const login = (req, resp) => {
    //SIN ENCRIPTAR CONTRASENAS
    return resp.json({
        ok: true,
        msg: "Inicio sesion",
        body: req.body
    });
};
exports.login = login;
