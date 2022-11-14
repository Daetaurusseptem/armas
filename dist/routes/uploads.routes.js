"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_1 = require("../controllers/uploads");
const router = (0, express_1.Router)();
router.post('/:empresaId/:areaId/:empleadoId', uploads_1.fileUpload);
exports.default = router;
