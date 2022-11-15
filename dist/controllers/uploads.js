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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivo = void 0;
const shortid_1 = __importDefault(require("shortid"));
const fs_1 = __importDefault(require("fs"));
const empresas_1 = require("../models/empresas");
const expedientes_1 = require("../models/expedientes");
const subirArchivo = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { empresaId, areaId, empleadoId, departamentoId } = req.params;
    const { nombre, nota, actualizo, tipo_expediente } = req.body;
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
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'xls', 'xlsx', 'pdf', 'doc', 'docx'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return resp.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }
    const nombreArchivo = `${nombreCortado[0]}.${extensionArchivo}`;
    //img path
    let path = `C:/expedientes/${empresaId}/${areaId}/${departamentoId}/${empleadoId}/${nombreArchivo}`;
    file.name = nombreArchivo;
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return resp.status(500).json({
                ok: false,
                msg: 'Ocurrio un error inesperado'
            });
        }
    });
    path = `${empresaId}/${areaId}/${departamentoId}/${empleadoId}/${nombreArchivo}`;
    const expediente = {
        id: shortid_1.default.generate(),
        nota,
        actualizo,
        path,
        areaId,
        empresaId,
        empleadoId,
        tipo_expediente
    };
    const crearExpediente = yield expedientes_1.expedientes.create(expediente);
    crearExpediente.save();
    return resp.status(200).json({
        ok: true,
        empresasValidas,
        nombreCortado,
        extensionArchivo,
        path,
        expediente: crearExpediente
    });
});
exports.subirArchivo = subirArchivo;
exports.getArchivo = (req, resp) => {
    const { pathImg } = req.params;
    //img por defecto
    if (fs_1.default.existsSync(pathImg)) {
        return resp.sendFile(pathImg);
    }
    else {
        return resp.status(200).json({});
    }
};
