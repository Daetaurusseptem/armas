import { expedientes } from './../models/expedientes';
import { empleados } from './../models/empleados';

const Usuario = require('../models/Usuarios');
const fs = require('fs');
const Materias = require('../models/Materias');
const Eventos = require('../models/Eventos');


const borrarArchivo = (path:string) => {
    if (fs.existsSync(path)) {

        fs.unlinkSync(path);

    }
}

export const actualizarArchivo = async (expedienteId:string, empresaId:string, areaId:string, empleadoId:string, departamentoId:string, nombrearchivo:string) => {

    
    let pathViejo ='';

            const expedienteSelected  = await expedientes.findByPk(expedienteId);
            if ( !expedienteSelected ) {
                return false;
            }

            pathViejo = `C:/expedientes/${empresaId}/${areaId}/${departamentoId}/${nombrearchivo}`
            //Borrar archivo antiguo
            borrarArchivo(pathViejo);

            await expedienteSelected.update({path : "Doe" }, {
                where: {
                  lastName: null
                }
              });
              expedienteSelected.save()

            return true;
       



}