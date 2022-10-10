"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empleados_1 = require("../models/empleados");
const empresas_1 = require("../models/empresas");
empresas_1.empresas.hasOne(empleados_1.empleados);
