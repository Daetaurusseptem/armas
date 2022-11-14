"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const empresas_1 = require("../models/empresas");
const fileUpload = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { empresaId, areaId, empleadoId } = req.params;
    const { nombre } = req.body;
    let empresasValidas = [];
    // Validar tipo
    yield (yield empresas_1.empresas.findAll({ attributes: ['id'] })).forEach((r) => {
        empresasValidas.push(r.id);
    });
    if (!empresasValidas.includes(empresaId)) {
        return resp.status(400).json({
            ok: false,
            msg: 'Empresa no valida'
        });
    }
    console.log(req.files);
    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo',
        });
    }
    const file = req.files.archivo;
    const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'xls', 'xlsx', 'pdf', 'doc', 'docx'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return resp.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }
    return resp.status(200).json({
        ok: true,
        empresasValidas,
        nombreCortado,
        extensionArchivo
    });
});
exports.fileUpload = fileUpload;
