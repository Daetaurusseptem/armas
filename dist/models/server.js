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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const empleados_routes_1 = __importDefault(require("../routes/empleados.routes"));
const empresas_routes_1 = __importDefault(require("../routes/empresas.routes"));
const usuarios_routes_1 = __importDefault(require("../routes/usuarios.routes"));
const areas_routes_1 = __importDefault(require("../routes/areas.routes"));
const permisos_routes_1 = __importDefault(require("../routes/permisos.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const departamentos_routes_1 = __importDefault(require("../routes/departamentos.routes"));
const busqueda_routes_1 = __importDefault(require("../routes/busqueda.routes"));
const uploads_routes_1 = __importDefault(require("../routes/uploads.routes"));
const expedientes_routes_1 = __importDefault(require("../routes/expedientes.routes"));
const cors = require('cors');
const path = require('path');
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.dbConnect().catch(err => console.log(err));
        this.listen();
        this.app.use((0, express_fileupload_1.default)({ createParentPath: true }));
        this.middlewares();
        this.routes();
        this.app.use(express_1.default.static('public'));
    }
    listen() {
        this.app.listen(process.env.PORT, () => { console.log(`Listening in port ${this.port}`); });
    }
    routes() {
        this.app.use('/api/empleados', empleados_routes_1.default);
        this.app.use('/api/usuarios', usuarios_routes_1.default);
        this.app.use('/api/empresas', empresas_routes_1.default);
        this.app.use('/api/areas', areas_routes_1.default);
        this.app.use('/api/departamentos', departamentos_routes_1.default);
        this.app.use('/api/permisos', permisos_routes_1.default);
        this.app.use('/api/auth', auth_routes_1.default);
        this.app.use('/api/busqueda', busqueda_routes_1.default);
        this.app.use('/api/uploads', uploads_routes_1.default);
        this.app.use('/api/expedientes', expedientes_routes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(cors());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                require('../db/assotiations');
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.Server = Server;
