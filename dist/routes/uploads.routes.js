"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_1 = require("../controllers/uploads");
const router = (0, express_1.Router)();
router.post('/:empresaId/:areaId/:departamentoId/:empleadoId', uploads_1.subirArchivo);
router.put('/img/:empresaId/:empleadoId/:empNum', uploads_1.subirImg);
exports.default = router;
