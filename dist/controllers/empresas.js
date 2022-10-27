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
exports.updateEmpresa = exports.createEmpresa = exports.getEmpresa = exports.getEmpresas = void 0;
const empresas_1 = require("../models/empresas");
//GET - Obtener Empresas
const getEmpresas = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const listaEmpresas = yield empresas_1.empresas.findAll();
    return resp.json({
        ok: true,
        empresas: listaEmpresas
    });
});
exports.getEmpresas = getEmpresas;
//GET - Obtener Empresa - params: idEmpresa
const getEmpresa = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idEmpresa } = req.params;
        const empresaDb = yield empresas_1.empresas.findByPk(idEmpresa);
        if (!empresaDb) {
            return resp.json({
                ok: false,
                msg: 'No se encontro la empresa'
            });
        }
        return resp.status(200).json({
            ok: true,
            empresa: empresaDb
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            msg: 'Hubo un error inesperado', error
        });
    }
});
exports.getEmpresa = getEmpresa;
//POST - Crear Empresa
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
const updateEmpresa = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idEmpresa } = req.params;
        const empresaExiste = yield empresas_1.empresas.findByPk(idEmpresa);
        if (!empresaExiste) {
            return resp.status(400).json({
                ok: false,
                msg: 'Este empleado no existe'
            });
        }
        console.log(req.body);
        const updateEmpresa = yield empresas_1.empresas.update(req.body, { where: { id: idEmpresa } });
        return resp.status(200).json({
            ok: false,
            msg: 'Empresa actualizada'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado' + error
        });
    }
});
exports.updateEmpresa = updateEmpresa;
