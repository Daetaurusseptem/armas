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
exports.createEmpresa = void 0;
const empresas_1 = require("../models/empresas");
const createEmpresa = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoEmpresa = req.body;
    try {
        //Se busca si el Empresa existe
        const Empresa = yield empresas_1.empresas.findByPk(nuevoEmpresa.id);
        if (Empresa) {
            return resp.status(400).json({
                ok: false,
                msg: 'ID Empresa ya existe'
            });
        }
        //Si no existe se crea el Empresa
        const crearEmpresa = yield empresas_1.empresas.create(req.body);
        crearEmpresa.save();
        return resp.status(200).json({
            ok: false,
            msg: 'Empresa creada exitosamente'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'error inesperado: ' + error
        });
    }
});
exports.createEmpresa = createEmpresa;
