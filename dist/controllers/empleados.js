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
exports.darDeBajaAlta = exports.updateEmpleado = exports.createEmpleado = exports.getEmpleados = void 0;
const empleados_1 = require("../models/empleados");
const empresas_1 = require("../models/empresas");
const shortid_1 = __importDefault(require("shortid"));
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
        console.log(req.body.numero_empleado, req.body.empresaId);
        //validacion empresa
        const empleadoMismaEmpresa = yield empleados_1.empleados.findOne({ where: { numero_empleado: req.body.numero_empleado, empresaId: req.body.empresaId } });
        console.log(empleado);
        if (empleadoMismaEmpresa) {
            console.log('entro');
            return resp.status(400).json({
                ok: false,
                msg: 'El empleado ya esta registrado en la empresa'
            });
        }
        req.body.id = shortid_1.default.generate();
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
const updateEmpleado = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { empleadoId } = req.params;
    const empleadoExiste = yield empleados_1.empleados.findByPk(empleadoId);
    if (!empleadoExiste) {
        return resp.status(400).json({
            ok: false,
            msg: 'Este empleado no existe'
        });
    }
    const updateEmpleado = yield empleados_1.empleados.update({ where: { id: empleadoId } }, req.body);
});
exports.updateEmpleado = updateEmpleado;
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
        return resp.status(500).json({
            ok: false,
            msg: 'error: ' + error
        });
    }
});
exports.darDeBajaAlta = darDeBajaAlta;
