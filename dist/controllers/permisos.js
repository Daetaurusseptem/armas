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
exports.agregarPermiso = void 0;
const areas_1 = require("../models/areas");
const permisos_1 = require("../models/permisos");
const usuarios_1 = require("../models/usuarios");
const agregarPermiso = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario, idArea, tipo } = req.params;
    const areaDB = yield areas_1.areas.findByPk(idArea);
    const usuarioDB = yield usuarios_1.usuarios.findByPk(idUsuario);
    if (!usuarioDB) {
        return resp.status(404).json({
            ok: false,
            msg: 'No se encontro el usuario, verifique el id'
        });
    }
    if (!areaDB) {
        return resp.status(404).json({
            ok: false,
            msg: 'No se encontro el area, verifique el id'
        });
    }
    //checar permisos
    const permisosDB = yield permisos_1.permisos.findOne({ where: { usuarioId: idUsuario, areaId: idArea } });
    if (permisosDB) {
        permisosDB.destroy();
        permisosDB.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Permisos revocados'
        });
    }
    else {
        const crearPrivilegios = yield permisos_1.permisos.create({ usuarioId: idUsuario, areaId: idArea, tipo });
        yield crearPrivilegios.save();
        return resp.status(200).json({
            ok: false,
            msg: 'Permisos Agregados'
        });
    }
});
exports.agregarPermiso = agregarPermiso;
