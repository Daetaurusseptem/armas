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
exports.updateConfig = exports.createConfig = exports.getConfigs = void 0;
const areas_1 = require("../models/areas");
const configuraciones_1 = require("../models/configuraciones");
const getConfigs = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const listaConfiguraciones = yield configuraciones_1.configuraciones.findAll();
    return resp.json({
        ok: true,
        empleados: listaConfiguraciones
    });
});
exports.getConfigs = getConfigs;
const createConfig = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaConfig = req.body;
    try {
        //Se busca si el id de la configuracion existe
        const config = yield configuraciones_1.configuraciones.findByPk(nuevaConfig.id);
        if (config) {
            return resp.status(400).json({
                ok: false,
                msg: 'id config ya existe'
            });
        }
        //Si no existe se crea la configuacion
        const crearConfig = yield configuraciones_1.configuraciones.create(req.body);
        crearConfig.save();
        return resp.status(200).json({
            ok: false,
            msg: 'area creada exitosamente'
        });
    }
    catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'error inesperado: ' + error
        });
    }
});
exports.createConfig = createConfig;
const updateConfig = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { configId } = req.params;
    const configExiste = yield areas_1.areas.findByPk(configId);
    if (!configExiste) {
        return resp.status(400).json({
            ok: false,
            msg: 'El id de la configuracion no existe'
        });
    }
    const updateConfig = yield areas_1.areas.update({ where: { id: configId } }, req.body);
});
exports.updateConfig = updateConfig;
