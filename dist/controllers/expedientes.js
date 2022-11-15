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
exports.getExpedienteEmpleado = void 0;
const expedientes_1 = require("./../models/expedientes");
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
