"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const areas_1 = require("../controllers/areas");
const router = (0, express_1.Router)();
router.get('/', areas_1.getAreas);
router.post('/', areas_1.createArea);
exports.default = router;
