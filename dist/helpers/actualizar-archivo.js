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
exports.actualizarArchivo = void 0;
const expedientes_1 = require("./../models/expedientes");
const Usuario = require('../models/Usuarios');
const fs = require('fs');
const Materias = require('../models/Materias');
const Eventos = require('../models/Eventos');
const borrarArchivo = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};
const actualizarArchivo = (expedienteId, empresaId, areaId, empleadoId, departamentoId, nombrearchivo) => __awaiter(void 0, void 0, void 0, function* () {
    let pathViejo = '';
    const expedienteSelected = yield expedientes_1.expedientes.findByPk(expedienteId);
    if (!expedienteSelected) {
        return false;
    }
    pathViejo = `C:/expedientes/${empresaId}/${areaId}/${departamentoId}/${nombrearchivo}`;
    //Borrar archivo antiguo
    borrarArchivo(pathViejo);
    yield expedienteSelected.update({ path: "Doe" }, {
        where: {
            lastName: null
        }
    });
    expedienteSelected.save();
    return true;
});
exports.actualizarArchivo = actualizarArchivo;
