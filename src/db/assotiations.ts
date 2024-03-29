import { areas } from "../models/areas"
import { empleados } from "../models/empleados"
import { empresas } from "../models/empresas"
import { expedientes } from "../models/expedientes"
import { departamentos } from "../models/departamentos"
import { permisos } from "../models/permisos"
import { tipo_expedientes } from "../models/tipo_expediente"
import { usuarios } from "../models/usuarios" 


//Campo empresaId en tabla empleados
empleados.belongsTo(empresas, {constraints:true, foreignKey:{name:'empresaId',allowNull:false}})  
//Campo empresaId en tabla empleados

empleados.belongsTo(departamentos, {constraints:true, foreignKey:{name:'departamentoId',allowNull:false}})  
//!QUITA cada vez que se HAGA EL PRIMER SYNC Y VOLVER A PONER EL SEGUNDO SYNC
empleados.hasMany(expedientes)

areas.belongsTo(empresas, {constraints:true, foreignKey:{name:'empresaId', allowNull:false}}) 

tipo_expedientes.belongsTo(areas, {constraints:true, foreignKey:{name:'areaId', allowNull:false}})
expedientes.belongsTo(empleados, {constraints:true, foreignKey:{name:'empleadoId', allowNull:false}})
expedientes.belongsTo(areas, {constraints:true, foreignKey:{name:'areaId', allowNull:false}})
expedientes.belongsTo(empresas, {constraints:true, foreignKey:{name:'empresaId', allowNull:false}})
expedientes.belongsTo(tipo_expedientes, {constraints:true, foreignKey:{name:'tipo_expediente', allowNull:false}})

departamentos.belongsTo(empresas, {constraints:true, foreignKey:{name:'empresaId',allowNull:false}})
areas.belongsToMany(usuarios,   {through:permisos, constraints:true, foreignKey:{name:'areaId', allowNull:false}})
usuarios.belongsToMany(areas,  {through:permisos, constraints:true, foreignKey:{name:'usuarioId', allowNull:false}}) 




require('../db/modelsSync');