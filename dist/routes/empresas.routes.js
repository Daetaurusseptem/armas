"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresas_1 = require("../controllers/empresas");
const router = (0, express_1.Router)();
router.post('/', empresas_1.createEmpresa);
exports.default = router;
