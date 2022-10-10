import sequelize from '../db/db';
import {
    DataTypes
} from 'sequelize';


export const empleados = sequelize.define('Empleados', {
    id: {
        type: DataTypes.STRING(8),
        primaryKey: true
    },
    img:{
        type:DataTypes.STRING(100)
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull:false
    }, 

    apellido_paterno: {
        type: DataTypes.STRING(30), 
        allowNull:false
    },
    apellido_materno: {
        type: DataTypes.STRING(30) 
    },
    fecha_ingreso: {
        type: DataTypes.DATE(),
        allowNull:false
    },
    sexo: {
        type: DataTypes.CHAR(1),
        allowNull:false
    },
    empresa:{
        type:DataTypes.STRING(8),
        allowNull:false
    },
    area_trabajo: {
        type: DataTypes.STRING(8),
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