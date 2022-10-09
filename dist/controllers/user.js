"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = void 0;
const createUser = (req, resp) => {
    console.log(req.body);
    return resp.json({
        ok: true,
        body: req.body
    });
};
exports.createUser = createUser;
const login = (req, resp) => {
    return resp.json({
        ok: true,
        msg: "Inicio sesion",
        body: req.body
    });
};
exports.login = login;
