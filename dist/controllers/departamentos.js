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
exports.updateDepartamento = exports.createDepartamentos = exports.getDepartamento = exports.getDepartamentoEmpresaId = exports.getDepartamentos = void 0;
const empresas_1 = require("./../models/empresas");
const departamentos_1 = require("../models/departamentos");
const getDepartamentos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaDepartamentos = yield departamentos_1.departamentos.findAll();
        return resp.status(200).json({
            ok: true,
            departamentos: listaDepartamentos
        });
    }
    catch (error) {
        return resp.status(404).json({
            ok: false,
            msg: 'Hubo un error inesperado' + error
        });
    }
});
exports.getDepartamentos = getDepartamentos;
const getDepartamentoEmpresaId = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresaId } = req.params;
        const empresa = yield empresas_1.empresas.findByPk(empresaId);
        if (!empresa) {
            return resp.status(404).json({
                ok: false,
                msg: 'Empresa no existe'
            });
        }
        const listaDepartamentos = yield departamentos_1.departamentos.findAll({ where: { empresaId } });
        return resp.status(200).json({
            ok: true,
            departamentos: listaDepartamentos
        });
    }
    catch (error) {
        return resp.status(404).json({
            ok: false,
            msg: 'Hubo un error inesperado' + error
        });
    }
});
exports.getDepartamentoEmpresaId = getDepartamentoEmpresaId;
const getDepartamento = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { idDepartamento } = req.params;
    console.log(idDepartamento);
    try {
        const departamento = yield departamentos_1.departamentos.findByPk(idDepartamento);
        if (!departamento) {
            return resp.status(404).json({
                ok: true,
                msg: 'Departamento no existe'
            });
        }
        return resp.status(200).json({
            ok: true,
            departamento
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: "hubo unn error inesperado: ", error
        });
    }
});
exports.getDepartamento = getDepartamento;
const createDepartamentos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoDepartamento = req.body;
    try {
        //Se busca si el empleado existe
        const area = yield departamentos_1.departamentos.findByPk(nuevoDepartamento.id);
        if (area) {
            return resp.status(400).json({
                ok: false,
                msg: 'id departamento ya existe'
            });
        }
        //Si no existe se crea el empleado
        const crearDepartamento = yield departamentos_1.departamentos.create(req.body);
        crearDepartamento.save();
        return resp.status(200).json({
            ok: false,
            msg: 'departamento creado exitosamente'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'error inesperado: ' + error
        });
    }
});
exports.createDepartamentos = createDepartamentos;
const updateDepartamento = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { departamentoId } = req.params;
    const empresaExiste = yield departamentos_1.departamentos.findByPk(departamentoId);
    if (!empresaExiste) {
        return resp.status(400).json({
            ok: false,
            msg: 'Este empleado no existe'
        });
    }
    const updateDepartamento = yield departamentos_1.departamentos.update({ where: { id: departamentoId } }, req.body);
});
exports.updateDepartamento = updateDepartamento;
