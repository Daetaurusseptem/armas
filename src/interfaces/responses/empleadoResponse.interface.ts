import { Empleado } from "../pures/empleado.interface";

export interface RootObject {
    ok: boolean;
    empleados: Empleado[];
}