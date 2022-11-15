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
exports.getTiposExpedientes = exports.getExpedienteEmpleado = void 0;
const expedientes_1 = require("./../models/expedientes");
const empresas_1 = require("../models/empresas");
const areas_1 = require("../models/areas");
const tipo_expediente_1 = require("../models/tipo_expediente");
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
const getTiposExpedientes = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
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
        const areasEmpresa = yield areas_1.areas.findAll({ where: { empresaId } });
        const areasEmpresaArray = areasEmpresa.map((r) => {
            return r.id;
        });
        const tiposExpedientes = yield tipo_expediente_1.tipo_expedientes.findAll();
        const tipos = tiposExpedientes.map((tipo) => {
            if (areasEmpresaArray.includes(tipo.areaId)) {
                console.log(tipo);
                return tipo;
            }
            else {
                return;
            }
        });
        return resp.status(200).json({
            ok: true,
            tiposExpediente: tipos
        });
    }
    catch (error) {
        return resp.status(400).json({
            ok: false,
            msg: error
        });
    }
});
exports.getTiposExpedientes = getTiposExpedientes;
