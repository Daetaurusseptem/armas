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
exports.createEmpleado = exports.getEmpleados = void 0;
const empleados_1 = require("../models/empleados");
const getEmpleados = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const listaEmpleados = yield empleados_1.empleados.findAll();
    return resp.json({
        ok: true,
        empleados: listaEmpleados
    });
});
exports.getEmpleados = getEmpleados;
const createEmpleado = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoEmpleado = req.body;
    try {
        //Se busca si el empleado existe
        const empleado = yield empleados_1.empleados.findByPk(nuevoEmpleado.id);
        if (empleado) {
            return resp.status(400).json({
                ok: false,
                msg: 'empleado ya existe'
            });
        }
        //Si no existe se crea el empleado
        const crearEmpleado = yield empleados_1.empleados.create(req.body);
        crearEmpleado.save();
        return resp.status(200).json({
            ok: false,
            msg: 'empleado creado exitosamente'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'error inesperado: ' + error
        });
    }
});
exports.createEmpleado = createEmpleado;
