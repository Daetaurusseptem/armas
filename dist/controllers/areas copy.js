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
exports.createArea = exports.getAreas = void 0;
const areas_1 = require("../models/areas");
const getAreas = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const listaAreas = yield areas_1.areas.findAll();
    return resp.json({
        ok: true,
        empleados: listaAreas
    });
});
exports.getAreas = getAreas;
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
