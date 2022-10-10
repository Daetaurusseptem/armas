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
exports.darDeBajaAlta = exports.createEmpleado = exports.getEmpleados = void 0;
const empleados_1 = require("../models/empleados");
const empresas_1 = require("../models/empresas");
const getEmpleados = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const listaEmpleados = yield empleados_1.empleados.findAll({ include: empresas_1.empresas });
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
const darDeBajaAlta = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idEmpleado } = req.params;
        console.log(idEmpleado);
        const empleadoDB = yield empleados_1.empleados.findByPk(idEmpleado);
        const nombreUsuario = yield (empleadoDB === null || empleadoDB === void 0 ? void 0 : empleadoDB.getDataValue('nombre'));
        console.log(nombreUsuario);
        if (!empleadoDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'error: El usuario no existe'
            });
        }
        if (empleadoDB.getDataValue("status")) {
            empleadoDB.update({ "status": 0 });
        }
        else {
            empleadoDB.update({ "status": 1 });
        }
    }
    catch (error) {
    }
});
exports.darDeBajaAlta = darDeBajaAlta;
