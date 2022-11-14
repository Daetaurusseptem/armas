"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
console.log('cargada permisos');
const permisos_1 = require("../controllers/permisos");
const router = (0, express_1.Router)();
//POST - Crear Prmiso para cierta area
router.post('/:idUsuario/:idArea/:tipo', permisos_1.agregarEliminarPermiso);
exports.default = router;
