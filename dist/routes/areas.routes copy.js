"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const areas_1 = require("./../controllers/areas");
const express_1 = require("express");
const areas_2 = require("../controllers/areas");
const router = (0, express_1.Router)();
//GET - Obtener todas las areas existentes
router.get('/', areas_2.getAreas);
//GET - Obtener Area por id
router.get('/:idArea/:usuarioId', areas_1.getArea);
//DELETE - Eliminar Permisos de Area de un usuario Indicado
router.delete('/:idArea', areas_1.getArea);
//POST - Crear una nueva area
router.post('/', areas_2.createArea);
//PUT - Actualizar informacion del area
router.put('/', areas_2.updateArea);
exports.default = router;
