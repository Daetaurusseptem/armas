import { areas } from "../models/areas"
import { empleados } from "../models/empleados"
import { empresas } from "../models/empresas"
import { permisos } from "../models/permisos"
import { usuarios } from "../models/usuarios"

empleados.belongsTo(empresas, {
    constraints:true, 
    foreignKey:{
        name:'empresaId', 
        allowNull:false,
    }  

})  
areas.belongsToMany(usuarios,   {through:permisos, constraints:true, foreignKey:{name:'usuarioId', allowNull:false}})
usuarios.belongsToMany(areas,   {through:permisos, constraints:true, foreignKey:{name:'areaId', allowNull:false}}) 
