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
exports.actualizarImagen = void 0;
const empleados_1 = require("./../models/empleados");
const fs = require('fs');
const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};
const actualizarImagen = (empleadoId, empresaId, empNum, nombreArchivo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pathViejo = '';
        const empleadoDb = yield empleados_1.empleados.findByPk(empleadoId);
        if (!empleadoDb) {
            return false;
        }
        pathViejo = `C:/expedientes/fotos/${empresaId}/${empNum}/${nombreArchivo}`;
        borrarImagen(pathViejo);
        const img = `${empresaId}/${empNum}/${nombreArchivo}`;
        empleadoDb.set('img', img);
        yield empleadoDb.save();
        return true;
    }
    catch (error) {
        return error;
    }
});
exports.actualizarImagen = actualizarImagen;
