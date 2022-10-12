"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const areas_1 = require("../controllers/areas");
const router = (0, express_1.Router)();
//GET - Obtener todas las areas existentes
router.get('/', areas_1.getAreas);
//POST - Crear una nueva area
router.post('/', areas_1.createArea);
//PUT - Actualizar informacion del area
router.put('/', areas_1.updateArea);
exports.default = router;
