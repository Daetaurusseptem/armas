import sequelize from '../db/db';
import {
    DataTypes
} from 'sequelize';


export const areas = sequelize.define('Areas', {
    id: {
        type: DataTypes.STRING(8),
        primaryKey: true,
        unique: true,
        allowNull:false
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull:false
    }, 
    descripcion:{
        type:DataTypes.STRING(30),
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











