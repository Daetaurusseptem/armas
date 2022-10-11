"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = void 0;
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
exports.usuarios = db_1.default.define('Usuarios', {
    id: {
        type: sequelize_1.DataTypes.STRING(8),
        primaryKey: true
    },
    img: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING(11),
        allowNull: false,
        unique: true,
        validate: { min: 5 },
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(64)
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
