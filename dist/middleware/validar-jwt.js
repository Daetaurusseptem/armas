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
exports.validarADMIN_ROLE = exports.validarJWT = void 0;
const usuarios_1 = require("../models/usuarios");
const jwt = require('jsonwebtoken');
const validarJWT = (req, resp, next) => {
    const token = req.header('x-token');
    console.log(token);
    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: `no hay token en la validacion`
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    }
    catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: "token no valido"
        });
    }
};
exports.validarJWT = validarJWT;
const validarADMIN_ROLE = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    try {
        console.log(uid);
        const usuarioDB = yield usuarios_1.usuarios.findByPk(uid);
        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        if (usuarioDB.get('role') !== 'ADMIN_ROLE') {
            return resp.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.validarADMIN_ROLE = validarADMIN_ROLE;
