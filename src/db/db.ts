import {Sequelize} from 'sequelize';
import { empleados } from '../models/empleados';
import { empresas } from '../models/empresas';


const sequelize = new Sequelize('prueba','jaime','123',
{
    host:'localhost',
    dialect:'mssql',
    port: 49673
} 
)
 


export default sequelize  