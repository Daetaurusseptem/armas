"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.empleados = void 0;
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
exports.empleados = db_1.default.define('Empleados', {
    id: {
        type: sequelize_1.DataTypes.CHAR(8),
        primaryKey: true,
        unique: true
    },
    nombre: {
        type: sequelize_1.DataTypes.CHAR(30)
    },
    apellido_paterno: {
        type: sequelize_1.DataTypes.CHAR(30)
    },
    apellido_materno: {
        type: sequelize_1.DataTypes.CHAR(30)
    },
    fecha_ingreso: {
        type: sequelize_1.DataTypes.DATE()
    },
    sexo: {
        type: sequelize_1.DataTypes.CHAR(1)
    },
    empresa: {
        type: sequelize_1.DataTypes.CHAR(30),
    },
    area_trabajo: {
        type: sequelize_1.DataTypes.CHAR(8)
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    actualizo: {
        type: sequelize_1.DataTypes.CHAR(8)
    }
}, {
    createdAt: 'creadoEl',
    updatedAt: 'actualizadoEl'
});
