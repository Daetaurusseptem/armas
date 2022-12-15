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
exports.getTipoExpediente = exports.updateTipoExpediente = exports.deleteTipoExpediente = exports.getExpedientesObligatorios = exports.eliminarExpediente = exports.crearTipoExpedienteArea = exports.getTiposExpedientesArea = exports.getExpedienteEmpleado = void 0;
const expedientes_1 = require("./../models/expedientes");
const empresas_1 = require("../models/empresas");
const areas_1 = require("../models/areas");
const tipo_expediente_1 = require("../models/tipo_expediente");
const shortid_1 = __importDefault(require("shortid"));
const fs_1 = __importDefault(require("fs"));
const getExpedienteEmpleado = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { empleadoId, areaId, empresaId } = req.params;
    try {
        const expedienteEmpleado = yield expedientes_1.expedientes.findAll({ where: { empleadoId, areaId, empresaId }, include: tipo_expediente_1.tipo_expedientes });
        if (!expedienteEmpleado) {
            resp.status(404).json({
                ok: false,
                msg: 'Error: Empleado no existe'
            });
        }
        resp.status(200).json({
            ok: true,
            expedientes: expedienteEmpleado
        });
    }
    catch (error) {
        resp.status(200).json({
            ok: false,
            msg: 'Error'
        });
    }
});
exports.getExpedienteEmpleado = getExpedienteEmpleado;
const getTiposExpedientesArea = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresaId, areaId } = req.params;
        const empresa = yield empresas_1.empresas.findByPk(empresaId);
        const area = yield areas_1.areas.findByPk(areaId);
        if (!empresa) {
            return resp.status(400).json({
                ok: false,
                msg: 'Empresa no existe'
            });
        }
        else if (!area) {
            return resp.status(400).json({
                ok: false,
                msg: 'Area no existe'
            });
        }
        const tipoExpArea = yield tipo_expediente_1.tipo_expedientes.findAll({ where: { areaId } });
        return resp.status(200).json({
            ok: true,
            tiposExpediente: tipoExpArea
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: error
        });
    }
});
exports.getTiposExpedientesArea = getTiposExpedientesArea;
const crearTipoExpedienteArea = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo, descripcion, actualizo, obligatorio } = req.body;
        const id_tipo = shortid_1.default.generate();
        const { empresaId, areaId } = req.params;
        const empresa = yield empresas_1.empresas.findByPk(empresaId);
        if (!empresa) {
            return resp.status(404).json({
                ok: false,
                msg: 'Empresa no existe'
            });
        }
        const crearTipoExpedienteAreaBD = yield tipo_expediente_1.tipo_expedientes.create({
            tipo, descripcion, actualizo, areaId, id_tipo, obligatorio
        });
        crearTipoExpedienteAreaBD.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Tipo expediente creado satisfactoriamente'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: true,
            msg: 'Error inesperado' + error
        });
    }
});
exports.crearTipoExpedienteArea = crearTipoExpedienteArea;
const eliminarExpediente = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idExpediente } = req.params;
        console.log(idExpediente);
        const expedientDB = yield expedientes_1.expedientes.findByPk(idExpediente);
        console.log(expedientDB);
        const path = expedientDB.get('path');
        const pathAbsoluto = `C:/expedientes/${path}`;
        if (!expedientDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe el expediente'
            });
        }
        fs_1.default.unlinkSync(pathAbsoluto);
        expedientDB.destroy();
        return resp.status(200).json({
            ok: true,
            msg: 'Expediente eliminado',
            pathAbsoluto
        });
    }
    catch (error) {
        resp.status(500).json({
            ok: true,
            msg: 'Error:' + error,
        });
    }
});
exports.eliminarExpediente = eliminarExpediente;
const getExpedientesObligatorios = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresaId, areaId } = req.params;
        const empresa = yield empresas_1.empresas.findByPk(empresaId);
        const area = yield areas_1.areas.findByPk(areaId);
        if (!empresa) {
            return resp.status(400).json({
                ok: false,
                msg: 'Empresa no existe'
            });
        }
        else if (!area) {
            return resp.status(400).json({
                ok: false,
                msg: 'Area no existe'
            });
        }
        const tipoExpArea = yield tipo_expediente_1.tipo_expedientes.findAll({ where: { areaId, obligatorio: true } });
        return resp.status(200).json({
            ok: true,
            tiposExpediente: tipoExpArea
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: error
        });
    }
});
exports.getExpedientesObligatorios = getExpedientesObligatorios;
//*DELETE TIPO EXPEDIENTE
const deleteTipoExpediente = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idTipoExpediente } = req.params;
        const tipoExpedienteId = yield tipo_expediente_1.tipo_expedientes.findByPk(idTipoExpediente);
        if (!tipoExpedienteId) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se encontró el tipo de expedientes'
            });
        }
        yield tipoExpedienteId.destroy();
        return resp.status(200).json({
            ok: true,
            msg: 'El tipo de expediente ha sido eliminado exitosamente'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado el elemento que desea eliminar contiene registros'
        });
    }
});
exports.deleteTipoExpediente = deleteTipoExpediente;
//*ACTUALIZAR TIPO EXPEDIENTE
const updateTipoExpediente = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idTipoExpediente } = req.params;
        const empresaExiste = yield tipo_expediente_1.tipo_expedientes.findByPk(idTipoExpediente);
        if (!empresaExiste) {
            return resp.status(400).json({
                ok: false,
                msg: 'Este tipo de expediente no existe'
            });
        }
        const updateTipoExpediente = yield tipo_expediente_1.tipo_expedientes.update(req.body, { where: { id_tipo: idTipoExpediente } });
        return resp.status(200).json({
            ok: false,
            msg: 'Departamento Actualizado'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Error inesperado' + error
        });
    }
});
exports.updateTipoExpediente = updateTipoExpediente;
//*GET TIPO EXPEDIENTE
//*GET - Obtener tipo expediente por Id - params: idTipoExpediente
const getTipoExpediente = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTipoExpediente } = req.params;
    try {
        const tipoExpediente = yield tipo_expediente_1.tipo_expedientes.findByPk(idTipoExpediente);
        if (!tipoExpediente) {
            resp.status(404).json({
                ok: false,
                msg: "El tipo expediente no existe"
            });
        }
        return resp.status(200).json({
            ok: true,
            tipoExpediente: tipoExpediente,
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: true,
            msg: `Hubo un error inesperado: ${error}`,
        });
    }
});
exports.getTipoExpediente = getTipoExpediente;
