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
        type: sequelize_1.DataTypes.STRING(8),
        primaryKey: true
    },
    img: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    apellido_paterno: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    apellido_materno: {
        type: sequelize_1.DataTypes.STRING(30)
    },
    fecha_ingreso: {
        type: sequelize_1.DataTypes.DATE(),
        allowNull: false
    },
    sexo: {
        type: sequelize_1.DataTypes.CHAR(1),
        allowNull: false
    },
    empresa: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: false
    },
    area_trabajo: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    actualizo: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: false
    }
}, {
    createdAt: 'creadoEl',
    updatedAt: 'actualizadoEl'
});
