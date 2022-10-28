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
const usuarios_1 = require("../models/usuarios");
const sequelize_1 = __importDefault(require("sequelize"));
const areas_1 = require("../models/areas");
const empresas_1 = require("../models/empresas");
const Op = sequelize_1.default.Op;
exports.busquedaDocumentoColeccion = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busqueda } = req.params;
        const coleccionQuery = req.params.coleccion.toLowerCase();
        let data = [];
        switch (coleccionQuery) {
            case 'usuarios':
                data = yield usuarios_1.usuarios.findAll({ include: areas_1.areas,
                    where: {
                        [Op.or]: [
                            { usuario: { [Op.like]: `%${busqueda}%` } },
                            { nombre: { [Op.like]: `%${busqueda}%` } }
                        ]
                    }
                });
                break;
            case 'areas':
                data = yield areas_1.areas.findAll({
                    where: {
                        [Op.or]: [
                            { nombre: { [Op.like]: `%${busqueda}%` } },
                            { descripcion: { [Op.like]: `%${busqueda}%` } },
                            { id: { [Op.like]: `%${busqueda}%` } }
                        ]
                    }
                });
                break;
            case 'empresas':
                data = yield empresas_1.empresas.findAll({
                    where: {
                        [Op.or]: [
                            { nombre: { [Op.like]: `%${busqueda}%` } },
                            { descripcion: { [Op.like]: `%${busqueda}%` } },
                            { id: { [Op.like]: `%${busqueda}%` } }
                        ]
                    }
                });
                break;
            //  case 'departamento':
            //          data = await Eventos.find({nombre:regEx})
            //                               .populate('realizadores');
            //          break;          
            default:
                return resp.status(400).json({
                    ok: false,
                    msg: "Coleccion invalida"
                });
        }
        return resp.status(200).json({
            ok: true,
            busqueda,
            resultados: data
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: "Busqueda invalida" + error
        });
    }
});
