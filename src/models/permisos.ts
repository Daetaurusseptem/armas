import sequelize from '../db/db';
import {
    DataTypes
} from 'sequelize';


export const permisos = sequelize.define('Permisos',{
    tipo:{
        type:DataTypes.STRING(1)
    }
})











