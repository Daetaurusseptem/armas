import { areas } from "../models/areas"
import { empleados } from "../models/empleados"
import { empresas } from "../models/empresas"
import { permisos } from "../models/permisos"
import { usuarios } from "../models/usuarios"

empresas.sync({force:false})   
empleados.sync({force:false}) 
areas.sync({force:false}) 
permisos.sync({force:true})
usuarios.sync({force:true}) 