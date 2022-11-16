"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipo_expedientes = void 0;
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
exports.tipo_expedientes = db_1.default.define('Tipo_Expedientes', {
    id_tipo: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING(9),
        allowNull: false
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    actualizo: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: false,
    }
}, {
    createdAt: 'creadoEl',
    updatedAt: 'actualizadoEl'
});
