import sequelize from '../db/db';
import {
    DataTypes
} from 'sequelize';


export const configuraciones = sequelize.define('Configuraciones', {
    id: {
        type: DataTypes.STRING(8),
        primaryKey: true,
        unique: true,
        allowNull:false
    },
    config_nombre:{
        type:DataTypes.STRING(20)
    },
    config_value:{
        type:DataTypes.STRING(200)
    },
    descripcion:{
        type:DataTypes.STRING(30),
        allowNull:false
    }
}, 
{
    createdAt: 'creadoEl',  
    updatedAt: 'actualizadoEl'
}
)











