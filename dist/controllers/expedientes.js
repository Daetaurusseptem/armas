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
exports.crearTipoExpedienteArea = exports.getTiposExpedientesArea = exports.getExpedienteEmpleado = void 0;
const expedientes_1 = require("./../models/expedientes");
const empresas_1 = require("../models/empresas");
const areas_1 = require("../models/areas");
const tipo_expediente_1 = require("../models/tipo_expediente");
const shortid_1 = __importDefault(require("shortid"));
const getExpedienteEmpleado = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { empleadoId, areaId, empresaId } = req.params;
    try {
        const expedienteEmpleado = yield expedientes_1.expedientes.findAll({ where: { empleadoId, areaId, empresaId } });
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
        const areasEmpresa = yield areas_1.areas.findAll({ where: { empresaId } });
        const areasEmpresaArray = areasEmpresa.map((r) => {
            return r.id;
        });
        const tiposExpedientes = yield tipo_expediente_1.tipo_expedientes.findAll();
        const tipos = tiposExpedientes
            .reduce((resultados, tipo) => {
            if (areasEmpresaArray.includes(tipo.areaId)) {
                if (Array.isArray(resultados)) {
                    resultados.push(tipo);
                }
                else {
                    console.log(typeof resultados);
                }
            }
            return resultados;
        });
        const re = [];
        re.push(tipos);
        console.log(re);
        return resp.status(200).json({
            ok: true,
            tiposExpediente: re
        });
        console.log('paso de acas');
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
        const { tipo, descripcion, actualizo } = req.body;
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
            tipo, descripcion, actualizo, areaId, id_tipo
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
