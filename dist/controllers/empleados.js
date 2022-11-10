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
exports.darDeBajaAlta = exports.updateEmpleado = exports.createEmpleado = exports.getEmpleado = exports.getEmpleadoDepartamento = exports.busquedaEmpleadoDepartamento = exports.getEmpleadosDepartamento = exports.getEmpleadosEmpresa = exports.getEmpleados = void 0;
const empleados_1 = require("../models/empleados");
const empresas_1 = require("../models/empresas");
const shortid_1 = __importDefault(require("shortid"));
const departamentos_1 = require("../models/departamentos");
const sequelize_1 = require("sequelize");
//*GET - Obtener todos los empleados de todas las empresas
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
//*GET - Obtener empleados de una empresa - params empresaId
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
//*GET - Obtener empleados por deparrtamento -params: empleadoId
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
//*GET - Buscar empleados con termino - campos tabla busqueda: numeroEmpleado, nombre  - params: idEmpleado
const busquedaEmpleadoDepartamento = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresaId, termino } = req.params;
        const { departamentoId } = req.query;
        let data = [];
        if (departamentoId !== '') {
            data = yield empleados_1.empleados.findAll({
                include: [departamentos_1.departamentos, empresas_1.empresas],
                where: {
                    where: {
                        empresaId,
                        departamentoId
                    },
                    [sequelize_1.Op.or]: [
                        {
                            numero_empleado: {
                                [sequelize_1.Op.like]: `%${termino}%`,
                            },
                        },
                        {
                            nombre: {
                                [sequelize_1.Op.like]: `%${termino}%`,
                            },
                        },
                    ],
                },
            });
        }
        data = yield empleados_1.empleados.findAll({
            include: [departamentos_1.departamentos, empresas_1.empresas],
            where: {
                where: { empresaId },
                [sequelize_1.Op.or]: [
                    {
                        numero_empleado: {
                            [sequelize_1.Op.like]: `%${termino}%`,
                        },
                    },
                    {
                        nombre: {
                            [sequelize_1.Op.like]: `%${termino}%`,
                        },
                    },
                ],
            },
        });
        return resp.status(200).json({
            ok: true,
            busqueda: termino,
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
exports.busquedaEmpleadoDepartamento = busquedaEmpleadoDepartamento;
//*GET - Obtener empleado por empresa - params: empresaId
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
//*GET - Obtener empleado por Id - params: empleadoId
const getEmpleado = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { empleadoId } = req.params;
    try {
        const empleado = yield empleados_1.empleados.findByPk(empleadoId, { include: [empresas_1.empresas, departamentos_1.departamentos] });
        if (!empleado) {
            resp.status(404).json({
                ok: false,
                msg: "El empleado no existe",
            });
        }
        return resp.status(200).json({
            ok: true,
            empleado: empleado,
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
//*POST - Crear Empleado 
const createEmpleado = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero_empleado, empresaId } = req.body;
    try {
        //Se busca si el empleado existe
        const empleadoExiste = yield empleados_1.empleados.findOne({ where: { numero_empleado, empresaId } });
        if (empleadoExiste) {
            return resp.status(400).json({
                ok: false,
                msg: "empleado ya existe en la empresa",
            });
        }
        console.log(req.body.numero_empleado, req.body.empresaId);
        //validacion empresa
        req.body.id = shortid_1.default.generate();
        console.log(req.body);
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
//*PUT - Actualizar Empleado - params: idEmpleado
const updateEmpleado = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEmpleado } = req.params;
    try {
        const empleadoExiste = yield empleados_1.empleados.findByPk(idEmpleado);
        if (!empleadoExiste) {
            return resp.status(400).json({
                ok: false,
                msg: "Este empleado no existe",
            });
        }
        const updateEmpleado = yield empleados_1.empleados.update(req.body, { where: { id: idEmpleado } });
        return resp.status(200).json({
            ok: true,
            msg: "Empleado Actualizado",
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: "Hubo un error inesperado" + error
        });
    }
});
exports.updateEmpleado = updateEmpleado;
//*PUT - Switch Estatus Empleado - params: idEmpleado
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
