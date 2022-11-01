"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentos_1 = require("../controllers/departamentos");
const router = (0, express_1.Router)();
router.get('/', departamentos_1.getDepartamentos);
router.get('/:idDepartamento', departamentos_1.getDepartamento);
router.post('/', departamentos_1.createDepartamentos);
exports.default = router;
