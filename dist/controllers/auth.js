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
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.login = void 0;
const usuarios_1 = require("./../models/usuarios");
const jwt_1 = require("../helpers/jwt");
const Usuarios = require("../models/usuarios");
const bcrypt = require('bcrypt');
const { getMenuFrontEnd } = require("../helpers/menu-frontend");
const login = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, password } = req.body;
    try {
        const usuarioDB = yield usuarios_1.usuarios.findOne({ where: { usuario } });
        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'correo invalido'
            });
        }
        // const validPassword = bcrypt.compareSync(password, usuarioDB.getDataValue('password'));
        // if(!validPassword){
        //     return resp.status(400).json({
        //         ok:false,
        //         msg:'password invalido'
        //     })
        // }
        if (password != usuarioDB.getDataValue('password')) {
            return resp.status(400).json({
                ok: false,
                msg: 'password invalido'
            });
        }
        const token = yield (0, jwt_1.generarJWT)(usuarioDB.getDataValue('password'));
        return resp.status(200).json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.getDataValue('role'))
        });
    }
    catch (error) {
        return resp.status(500).json({
            okay: false,
            msg: 'Porfavor hable con el administrador' + error
        });
    }
});
exports.login = login;
const renewToken = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    const token = yield (0, jwt_1.generarJWT)(uid);
    //return user
    let usuario = yield Usuarios.findById(uid);
    return resp.status(200).json({
        ok: true,
        token,
        uid,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    });
});
exports.renewToken = renewToken;
