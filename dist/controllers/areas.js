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
exports.updateArea = exports.createArea = exports.getAreaUsers = exports.getArea = exports.removeUsuarioPermisos = exports.getAreasEmpresa = exports.getAreas = void 0;
const permisos_1 = require("./../models/permisos");
const areas_1 = require("../models/areas");
//GET - Obtener Areas
const getAreas = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const listaAreas = yield areas_1.areas.findAll();
    return resp.json({
        ok: true,
        areas: listaAreas
    });
});
exports.getAreas = getAreas;
const getAreasEmpresa = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresaId } = req.params;
        console.log('sdasdasd');
        const listaAreas = yield areas_1.areas.findAll({ where: { empresaId: empresaId } });
        if (!listaAreas) {
            return resp.status(404).json({
                ok: true,
                msg: "No se encontraron areas"
            });
        }
        console.log(listaAreas);
        return resp.status(200).json({
            ok: true,
            areas: listaAreas
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado'
        });
    }
});
exports.getAreasEmpresa = getAreasEmpresa;
//DELETE - Eliminar Permisos de Area de un usuario Indicado - Params: idArea, usuarioId
const removeUsuarioPermisos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { idArea, usuarioId } = req.params;
    try {
        const user = yield permisos_1.permisos.findOne({ where: { areaId: idArea, usuarioId } });
        if (!user) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        const eliminarUsuario = yield user.destroy();
        return resp.status(200).json({
            ok: true,
            msg: 'permisos de area eliminados'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: "hubo unn error inesperado", error
        });
    }
});
exports.removeUsuarioPermisos = removeUsuarioPermisos;
//GET - Obtener Area por id - params: idArea
const getArea = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { idArea } = req.params;
    try {
        const area = yield areas_1.areas.findByPk(idArea);
        return resp.status(200).json({
            ok: true,
            area
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: "hubo unn error inesperado", error
        });
    }
});
exports.getArea = getArea;
//GET - Obtener Usuarios con permiso a la area - params: areaId
const getAreaUsers = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { areaId } = req.params;
    try {
        const areaUsers = yield permisos_1.permisos.findAll({ where: { areaId: areaId } });
        console.log(areaUsers);
        return resp.status(200).json({
            ok: true,
            areaID: areaId,
            users: areaUsers
        });
    }
    catch (error) {
        return resp.status(200).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        });
    }
});
exports.getAreaUsers = getAreaUsers;
//POST - Crear Area
const createArea = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoArea = req.body;
    try {
        //Se busca si el empleado existe
        const area = yield areas_1.areas.findByPk(nuevoArea.id);
        if (area) {
            return resp.status(400).json({
                ok: false,
                msg: 'id area ya existe'
            });
        }
        //Si no existe se crea el empleado
        const crearArea = yield areas_1.areas.create(req.body);
        crearArea.save();
        return resp.status(200).json({
            ok: false,
            msg: 'area creada exitosamente'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'error inesperado: ' + error
        });
    }
});
exports.createArea = createArea;
//PUT - Actualizar Area
const updateArea = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { areaId } = req.params;
    const areaExiste = yield areas_1.areas.findByPk(areaId);
    if (!areaExiste) {
        return resp.status(400).json({
            ok: false,
            msg: 'Esta area no existe'
        });
    }
    const updateArea = yield areas_1.areas.update({ where: { areaId: areaId } }, req.body);
});
exports.updateArea = updateArea;
