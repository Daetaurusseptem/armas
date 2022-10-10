"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const areas_1 = require("../models/areas");
const empleados_1 = require("../models/empleados");
const empresas_1 = require("../models/empresas");
const permisos_1 = require("../models/permisos");
const usuarios_1 = require("../models/usuarios");
empleados_1.empleados.belongsTo(empresas_1.empresas, {
    constraints: true,
    foreignKey: {
        name: 'empresaId',
        allowNull: false,
    }
});
areas_1.areas.belongsToMany(usuarios_1.usuarios, { through: permisos_1.permisos, constraints: true, foreignKey: { name: 'usuarioId', allowNull: false } });
usuarios_1.usuarios.belongsToMany(areas_1.areas, { through: permisos_1.permisos, constraints: true, foreignKey: { name: 'areaId', allowNull: false } });
