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
        type: sequelize_1.DataTypes.STRING(9),
        primaryKey: true
    },
    numero_empleado: {
        type: sequelize_1.DataTypes.STRING(8)
    },
    img: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(30),
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
