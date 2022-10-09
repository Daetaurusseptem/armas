"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmpleados = void 0;
const getEmpleados = (req, resp) => {
    return resp.json({
        ok: true,
        msg: 'Productos'
    });
};
exports.getEmpleados = getEmpleados;
