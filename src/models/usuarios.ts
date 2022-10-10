import sequelize from '../db/db';
import {
    DataTypes
} from 'sequelize';


export const usuarios = sequelize.define('Usuarios', {
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
    password:{
        type:DataTypes.STRING(64)
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