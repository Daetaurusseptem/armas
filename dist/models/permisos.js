"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permisos = void 0;
const db_1 = __importDefault(require("../db/db"));
exports.permisos = db_1.default.define('Permisos', {});
