"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const areas_1 = require("../models/areas");
const empleados_1 = require("../models/empleados");
const empresas_1 = require("../models/empresas");
const expedientes_1 = require("../models/expedientes");
const departamentos_1 = require("../models/departamentos");
const permisos_1 = require("../models/permisos");
const tipo_expediente_1 = require("../models/tipo_expediente");
const usuarios_1 = require("../models/usuarios");
//Campo empresaId en tabla empleados
empleados_1.empleados.belongsTo(empresas_1.empresas, { constraints: true, foreignKey: { name: 'empresaId', allowNull: false } });
//Campo empresaId en tabla empleados
empleados_1.empleados.belongsTo(departamentos_1.departamentos, { constraints: true, foreignKey: { name: 'departamentoId', allowNull: false } });
empleados_1.empleados.belongsTo(empleados_1.empleados, { constraints: true, foreignKey: { name: 'jefeId', allowNull: true } });
areas_1.areas.belongsTo(empresas_1.empresas, { constraints: true, foreignKey: { name: 'empresaId', allowNull: false } });
tipo_expediente_1.tipo_expedientes.belongsTo(areas_1.areas, { constraints: true, foreignKey: { name: 'areaId', allowNull: false } });
expedientes_1.expedientes.belongsTo(areas_1.areas, { constraints: true, foreignKey: { name: 'areaId', allowNull: false } });
expedientes_1.expedientes.belongsTo(empresas_1.empresas, { constraints: true, foreignKey: { name: 'empresaId', allowNull: false } });
expedientes_1.expedientes.belongsTo(tipo_expediente_1.tipo_expedientes, { constraints: true, foreignKey: { name: 'tipo_expediente', allowNull: false } });
departamentos_1.departamentos.belongsTo(empresas_1.empresas, { constraints: true, foreignKey: { name: 'empresaId', allowNull: false } });
areas_1.areas.belongsToMany(usuarios_1.usuarios, { through: permisos_1.permisos, constraints: true, foreignKey: { name: 'areaId', allowNull: false } });
usuarios_1.usuarios.belongsToMany(areas_1.areas, { through: permisos_1.permisos, constraints: true, foreignKey: { name: 'usuarioId', allowNull: false } });
require('../db/modelsSync');
