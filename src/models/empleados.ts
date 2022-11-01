import sequelize from '../db/db';
import {
    DataTypes
} from 'sequelize';


export const empleados = sequelize.define('Empleados', {
    id:{
        type: DataTypes.STRING(9),
        primaryKey:true
    },
    numero_empleado: {
        type: DataTypes.STRING(8)
    },
    img:{
        type:DataTypes.STRING(100)
    },
    nombre:{
        type: DataTypes.STRING(30),
        allowNull:false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull:false
        
    },
    actualizo: {
        type: DataTypes.STRING(8),
        allowNull:false
    }
}, 
{
    createdAt: 'creadoEl',  
    updatedAt: 'actualizadoEl'
}
)