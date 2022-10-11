"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expedientes = void 0;
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
exports.expedientes = db_1.default.define('Expedientes', {
    nota: {
        type: sequelize_1.DataTypes.STRING(50),
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
