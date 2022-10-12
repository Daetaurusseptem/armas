"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuracion = void 0;
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
exports.configuracion = db_1.default.define('Configuraciones', {
    id: {
        type: sequelize_1.DataTypes.STRING(8),
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    config_nombre: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    config_value: {
        type: sequelize_1.DataTypes.STRING(200)
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    }
}, {
    createdAt: 'creadoEl',
    updatedAt: 'actualizadoEl'
});
