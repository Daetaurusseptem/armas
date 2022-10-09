"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.getEmpleados = () => {
    return express_1.response.json({
        ok: true,
        msg: 'Productos'
    });
};
