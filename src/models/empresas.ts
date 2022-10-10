import sequelize from '../db/db';
import {
    DataTypes
} from 'sequelize';


export const empresas = sequelize.define('Empresas', {
    id: {
        type: DataTypes.CHAR(8),
        primaryKey: true,
        unique: true,
        allowNull:false
    },
    nombre: {
        type: DataTypes.CHAR(30),
        allowNull:false
    }, 
    descripcion:{
        type:DataTypes.CHAR(30),
        allowNull:false
    },
    actualizo: {
        type: DataTypes.CHAR(8),
        allowNull:false
    } 
}, 
{
    createdAt: 'creadoEl',  
    updatedAt: 'actualizadoEl'
}
)











