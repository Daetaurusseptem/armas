import { Empresa } from "./empresa.interface";

export interface Empleado {
    id: string;
    img?: any;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    fecha_ingreso: Date;
    sexo: string;
    area_trabajo: string;
    status: boolean;
    actualizo: string;
    creadoEl: Date;
    actualizadoEl: Date;
    empresaId: string;
    Empresa: Empresa;
}