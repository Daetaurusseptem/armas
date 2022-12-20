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
exports.deleteEmpleado = exports.darDeBajaAlta = exports.updateEmpleado = exports.createEmpleado = exports.getEmpleado = exports.getEmpleadoDepartamento = exports.busquedaEmpleadoEDepartamento = exports.getEmpleadosDepartamento = exports.getEmpleadosEmpresa = exports.getEmpleados = void 0;
const expedientes_1 = require("./../models/expedientes");
const empleados_1 = require("../models/empleados");
const empresas_1 = require("../models/empresas");
const sequelize_1 = __importDefault(require("sequelize"));
const shortid_1 = __importDefault(require("shortid"));
const departamentos_1 = require("../models/departamentos");
const Op = sequelize_1.default.Op;
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
            include: [empresas_1.empresas, departamentos_1.departamentos, expedientes_1.expedientes],
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
const busquedaEmpleadoEDepartamento = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { empresaId } = req.params;
    const { departamentoId, busqueda } = req.query;
    try {
        let data = [];
        console.log(empresaId);
        //*Si departamentoId y busqueda
        if (departamentoId !== undefined && busqueda !== undefined) {
            console.log('si dep ' + departamentoId, busqueda);
            data = yield empleados_1.empleados.findAll({
                include: [departamentos_1.departamentos, empresas_1.empresas, expedientes_1.expedientes],
                where: {
                    [Op.and]: [
                        { empresaId }, { departamentoId }
                    ],
                    [Op.or]: [
                        { numero_empleado: { [Op.like]: `%${busqueda}%` } },
                        {
                            nombre: {
                                [Op.like]: `%${busqueda}%`,
                            },
                        },
                    ]
                },
            });
        }
        else if (departamentoId == undefined && busqueda !== undefined) {
            console.log('ej ejta');
            data = yield empleados_1.empleados.findAll({
                include: [departamentos_1.departamentos, empresas_1.empresas, expedientes_1.expedientes],
                where: {
                    empresaId,
                    [Op.or]: [
                        { numero_empleado: { [Op.like]: `%${busqueda}%` } },
                        { nombre: { [Op.like]: `%${busqueda}%` }, }
                    ]
                }
            });
        }
        else if (departamentoId !== undefined) {
            data = yield empleados_1.empleados.findAll({
                include: [departamentos_1.departamentos, empresas_1.empresas, expedientes_1.expedientes],
                where: { departamentoId, empresaId }
            });
        }
        return resp.status(200).json({
            ok: true,
            busqueda,
            departamentoId,
            empleados: data
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
exports.busquedaEmpleadoEDepartamento = busquedaEmpleadoEDepartamento;
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
//*DELETE EMPLEADO
const deleteEmpleado = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empleadoId } = req.params;
        const empleadoDb = yield empleados_1.empleados.findByPk(empleadoId);
        if (!empleadoDb) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se encontró el empleado'
            });
        }
        yield empleadoDb.destroy();
        return resp.status(200).json({
            ok: true,
            msg: 'El empleado ha sido eliminado exitosamente'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado el elemento que desea eliminar contiene registros'
        });
    }
});
exports.deleteEmpleado = deleteEmpleado;
