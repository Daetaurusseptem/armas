"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('prueba', 'jaime', '123', {
    host: 'localhost',
    dialect: 'mssql',
    port: 49673
});
exports.default = sequelize;
