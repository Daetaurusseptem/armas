"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.areas = void 0;
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
exports.areas = db_1.default.define('Areas', {
    id: {
        type: sequelize_1.DataTypes.STRING(8),
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(30),
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
