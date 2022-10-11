import sequelize from '../db/db';
import {
    DataTypes
} from 'sequelize';


export const tipo_expedientes = sequelize.define('Tipo_Expedientes', {
   id_tipo:{
    primaryKey:true,
    type:DataTypes.STRING(8),
    allowNull:false
    },
    tipo:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING(30),
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











