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
const empleados_routes_1 = __importDefault(require("../routes/empleados.routes"));
const empresas_routes_1 = __importDefault(require("../routes/empresas.routes"));
const usuarios_routes_1 = __importDefault(require("../routes/usuarios.routes"));
const areas_routes_1 = __importDefault(require("../routes/areas.routes"));
const empleados_1 = require("../models/empleados");
const usuarios_1 = require("../models/usuarios");
const empresas_1 = require("./empresas");
const areas_1 = require("../models/areas");
const permisos_1 = require("../models/permisos");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.dbConnect().catch(err => console.log(err));
        this.listen();
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(process.env.PORT, () => { console.log(`Listening in port ${this.port}`); });
    }
    routes() {
        this.app.use('/api/empleados', empleados_routes_1.default);
        this.app.use('/api/usuarios', usuarios_routes_1.default);
        this.app.use('/api/empresas', empresas_routes_1.default);
        this.app.use('/api/areas', areas_routes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                empresas_1.empresas.sync({ force: false });
                empleados_1.empleados.sync({ force: false });
                areas_1.areas.sync({ force: false });
                usuarios_1.usuarios.sync({ force: true });
                empleados_1.empleados.belongsTo(empresas_1.empresas, {
                    constraints: true,
                    foreignKey: {
                        name: 'empresaId',
                        allowNull: false,
                    }
                });
                areas_1.areas.belongsToMany(usuarios_1.usuarios, { through: permisos_1.permisos, constraints: true, foreignKey: { name: 'usuarioId', allowNull: false } });
                usuarios_1.usuarios.belongsToMany(areas_1.areas, { through: permisos_1.permisos, constraints: true, foreignKey: { name: 'areaId', allowNull: false } });
                empresas_1.empresas.sync({ force: false });
                empleados_1.empleados.sync({ force: false });
                areas_1.areas.sync({ force: false });
                permisos_1.permisos.sync({ force: true });
                usuarios_1.usuarios.sync({ force: true });
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.Server = Server;
