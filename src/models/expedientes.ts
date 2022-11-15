import sequelize from '../db/db';
import {
    DataTypes
} from 'sequelize';


export const expedientes = sequelize.define('Expedientes', {
   id:{
    type:DataTypes.STRING(9),
    primaryKey:true
   },
    nota:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    actualizo: {
        type: DataTypes.STRING(8),
        allowNull:false,
    },
    path:{
        type:DataTypes.STRING(250)
    }
},

{
    createdAt: 'creadoEl',  
    updatedAt: 'actualizadoEl'
}
)











