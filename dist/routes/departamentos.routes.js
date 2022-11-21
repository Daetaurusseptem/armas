"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const departamentos_1 = require("./../controllers/departamentos");
const express_1 = require("express");
const departamentos_2 = require("../controllers/departamentos");
const router = (0, express_1.Router)();
router.get('/', departamentos_2.getDepartamentos);
router.get('/:idDepartamento', departamentos_2.getDepartamento);
router.post('/', departamentos_2.createDepartamentos);
router.put('/:departamentoId', departamentos_1.updateDepartamento);
router.get('/empresa/:empresaId', departamentos_2.getDepartamentoEmpresaId);
exports.default = router;
