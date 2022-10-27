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
const Usuario = require('../models/Usuarios');
const fs = require('fs');
const Materias = require('../models/Materias');
const Eventos = require('../models/Eventos');
const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};
const actualizarImagen = (id, tipo, nombrearchivo) => __awaiter(void 0, void 0, void 0, function* () {
    let pathViejo = '';
    switch (tipo) {
        case 'materia':
            const materia = yield Materias.findById(id);
            if (!materia) {
                return false;
            }
            pathViejo = `./uploads/img/materias/${materia.img}`;
            borrarImagen(pathViejo);
            materia.img = nombrearchivo;
            materia.save();
            return true;
        case 'usuario':
            const usuario = yield Usuario.findById(id);
            if (!usuario) {
                return false;
            }
            pathViejo = `./uploads/img/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img = nombrearchivo;
            usuario.save();
            return true;
        case 'evento':
            const evento = yield Eventos.findById(id);
            if (!evento) {
                console.log('No se encontro evento');
                return false;
            }
            pathViejo = `./uploads/eventos/${evento.img}`;
            borrarImagen(pathViejo);
            evento.img = nombrearchivo;
            evento.save();
            return true;
    }
});
exports.actualizarImagen = actualizarImagen;
