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
exports.busquedaEmpleados = exports.darDeBajaAlta = exports.updateEmpleado = exports.createEmpleado = exports.getEmpleado = exports.getEmpleadoDepartamento = exports.getEmpleadosDepartamento = exports.getEmpleadosEmpresa = exports.getEmpleados = void 0;
const empleados_1 = require("../models/empleados");
const empresas_1 = require("../models/empresas");
const shortid_1 = __importDefault(require("shortid"));
const departamentos_1 = require("../models/departamentos");
const sequelize_1 = require("sequelize");
const getEmpleados = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaEmpleados = yield empleados_1.empleados.findAll({ include: [empresas_1.empresas, departamentos_1.departamentos], });
        return resp.status(200).json({
            ok: true,
            empleados: listaEmpleados,
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: true,
            msg: "Error inesperado",
        });
    }
});
exports.getEmpleados = getEmpleados;
const getEmpleadosEmpresa = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresaId } = req.params;
        console.log("id empresa: ", empresaId);
        const listaEmpleados = yield empleados_1.empleados.findAll({
            include: [empresas_1.empresas, departamentos_1.departamentos],
            where: { empresaId }
        });
        return resp.json({
            ok: true,
            empleados: listaEmpleados,
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: true,
            msg: "Hubo un error: " + error,
        });
    }
});
exports.getEmpleadosEmpresa = getEmpleadosEmpresa;
const getEmpleadosDepartamento = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { departamentoId } = req.params;
        console.log("id departamento: ", departamentoId);
        const listaEmpleados = yield empleados_1.empleados.findAll({
            include: [empresas_1.empresas, departamentos_1.departamentos],
            where: { departamentoId: departamentoId },
        });
        return resp.json({
            ok: true,
            empleados: listaEmpleados,
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: true,
            msg: "Hubo un error: " + error,
        });
    }
});
exports.getEmpleadosDepartamento = getEmpleadosDepartamento;
//GET - Obtener empleado por empresa
const getEmpleadoDepartamento = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('sissssasa');
        const { numeroEmpleado, empresaId } = req.params;
        const empleadoDepartamento = yield empleados_1.empleados.findOne({ where: { empresaId, numero_empleado: numeroEmpleado } });
        if (!empleadoDepartamento) {
            return resp.status(200).json({
                ok: false,
                msg: 'empleado no existe'
            });
        }
        return resp.status(200).json({
            ok: true,
            empleado: empleadoDepartamento
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: true,
            msg: error
        });
    }
});
exports.getEmpleadoDepartamento = getEmpleadoDepartamento;
const getEmpleado = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEmpleado } = req.params;
    try {
        const empleado = yield empleados_1.empleados.findOne({
            include: [empresas_1.empresas, departamentos_1.departamentos],
            where: { id: idEmpleado },
        });
        if (!empleado) {
            resp.status(404).json({
                ok: false,
                msg: "El empleado no existe",
            });
        }
        return resp.status(200).json({
            ok: true,
            empleados: empleado,
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: true,
            msg: `Hubo un error inesperado: ${error}`,
        });
    }
});
exports.getEmpleado = getEmpleado;
const createEmpleado = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoEmpleado = req.body;
    try {
        //Se busca si el empleado existe
        const empleado = yield empleados_1.empleados.findByPk(nuevoEmpleado.id);
        if (empleado) {
            return resp.status(400).json({
                ok: false,
                msg: "empleado ya existe",
            });
        }
        console.log(req.body.numero_empleado, req.body.empresaId);
        //validacion empresa
        const empleadoMismaEmpresa = yield empleados_1.empleados.findOne({
            where: {
                numero_empleado: req.body.numero_empleado,
                empresaId: req.body.empresaId,
            },
        });
        console.log(empleado);
        if (empleadoMismaEmpresa) {
            console.log("entro");
            return resp.status(400).json({
                ok: false,
                msg: "El empleado ya esta registrado en la empresa",
            });
        }
        req.body.id = shortid_1.default.generate();
        //Si no existe se crea el empleado
        const crearEmpleado = yield empleados_1.empleados.create(req.body);
        crearEmpleado.save();
        return resp.status(200).json({
            ok: false,
            msg: "empleado creado exitosamente",
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: "error inesperado: " + error,
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
            msg: "Este empleado no existe",
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
        const nombreUsuario = yield (empleadoDB === null || empleadoDB === void 0 ? void 0 : empleadoDB.getDataValue("nombre"));
        console.log(nombreUsuario);
        if (!empleadoDB) {
            return resp.status(404).json({
                ok: false,
                msg: "error: El usuario no existe",
            });
        }
        if (empleadoDB.getDataValue("status")) {
            empleadoDB.update({ status: 0 });
        }
        else {
            empleadoDB.update({ status: 1 });
        }
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: "error: " + error,
        });
    }
});
exports.darDeBajaAlta = darDeBajaAlta;
const busquedaEmpleados = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busqueda, empresaId, departamentoId } = req.params;
        let data = [];
        data = yield empleados_1.empleados.findAll({
            include: [departamentos_1.departamentos, empresas_1.empresas],
            where: {
                where: { empresaId },
                [sequelize_1.Op.or]: [
                    {
                        numero_empleado: {
                            [sequelize_1.Op.like]: `%${busqueda}%`,
                        },
                    },
                    {
                        nombre: {
                            [sequelize_1.Op.like]: `%${busqueda}%`,
                        },
                    },
                ],
            },
        });
        return resp.status(200).json({
            ok: true,
            busqueda,
            departamentos: data,
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: "Busqueda invalida" + error,
        });
    }
});
exports.busquedaEmpleados = busquedaEmpleados;
