import sequelize from '../db/db';
import {
    DataTypes
} from 'sequelize';


export const empleados = sequelize.define('Empleados', {
    id: {
        type: DataTypes.CHAR(8),
        primaryKey: true,
        unique: true
    },
    nombre: {
        type: DataTypes.CHAR(30)
    },

    apellido_paterno: {
        type: DataTypes.CHAR(30)
    },
    apellido_materno: {
        type: DataTypes.CHAR(30)
    },
    fecha_ingreso: {
        type: DataTypes.DATE()
    },
    sexo: {
        type: DataTypes.CHAR(1)
    },
    empresa: {
        type: DataTypes.CHAR(30),
    },
    area_trabajo: {
        type: DataTypes.CHAR(8)
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    actualizo: {
        type: DataTypes.CHAR(8)
    } 
}, 
{
    createdAt: 'creadoEl',  
    updatedAt: 'actualizadoEl'
}
)