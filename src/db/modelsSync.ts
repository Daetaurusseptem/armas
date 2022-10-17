import { areas } from "../models/areas"
import { empleados } from "../models/empleados"
import { empresas } from "../models/empresas"
import { departamentos } from "../models/departamentos"
import { permisos } from "../models/permisos"
import { usuarios } from "../models/usuarios"
import { tipo_expedientes } from "../models/tipo_expediente"
import { expedientes  } from "../models/expedientes"
import { configuraciones  } from "../models/configuraciones" 

empresas.sync()   
empleados.sync()
areas.sync()  
permisos.sync()
usuarios.sync()
departamentos.sync()
tipo_expedientes.sync({}) 
expedientes.sync() 
configuraciones.sync() 