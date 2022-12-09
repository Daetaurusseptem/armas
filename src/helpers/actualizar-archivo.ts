import { expedientes } from './../models/expedientes';
import { empleados } from './../models/empleados';
import { usuarios } from '../models/usuarios';


const fs = require('fs');

const borrarImagen = (path:string) => {
  if (fs.existsSync(path)) {
      console.log('se elimino anterior');

        fs.unlinkSync(path);

    }
}


export const actualizarImagen = async(empleadoId:string,empresaId:string, empNum:string, anterior:string, nombreArchivo:string) => {
        try {
          let pathViejo = '';
  
          const empleadoDb = await empleados.findByPk(empleadoId);
          if ( !empleadoDb ) {
              return false;
          }

          pathViejo = `C:/expedientes/fotos/${anterior}`;
          borrarImagen( pathViejo );
          const img= `${empresaId}/${empNum}/${nombreArchivo}`
          empleadoDb.set('img', img);
          await empleadoDb.save();
          return true;
        } catch (error) {
          return error
        }
         
}