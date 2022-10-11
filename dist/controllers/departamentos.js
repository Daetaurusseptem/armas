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
exports.createDepartamentos = exports.getDepartamentos = void 0;
const areas_1 = require("../models/areas");
const departamento_1 = require("../models/departamento");
const getDepartamentos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const listaDepartamentos = yield departamento_1.departamentos.findAll();
    return resp.json({
        ok: true,
        empleados: listaDepartamentos
    });
});
exports.getDepartamentos = getDepartamentos;
const createDepartamentos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoDepartamento = req.body;
    try {
        //Se busca si el empleado existe
        const area = yield areas_1.areas.findByPk(nuevoDepartamento.id);
        if (area) {
            return resp.status(400).json({
                ok: false,
                msg: 'id area ya existe'
            });
        }
        //Si no existe se crea el empleado
        const crearDepartamento = yield areas_1.areas.create(req.body);
        crearDepartamento.save();
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
exports.createDepartamentos = createDepartamentos;
