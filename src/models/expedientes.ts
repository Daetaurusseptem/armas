import sequelize from '../db/db';
import {
    DataTypes
} from 'sequelize';


export const expedientes = sequelize.define('Expedientes', {
   
    nota:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    actualizo: {
        type: DataTypes.STRING(8),
        allowNull:false,
    }
},

{
    createdAt: 'creadoEl',  
    updatedAt: 'actualizadoEl'
}
)











