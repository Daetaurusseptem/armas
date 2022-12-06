import {Sequelize} from 'sequelize';
import { empleados } from '../models/empleados';
import { empresas } from '../models/empresas';


const sequelize = new Sequelize('prueba','jaime','123',
{ 
    host:'localhost',
    dialect:'mssql',
    port: 49676
    //port laptop:49674 //port pc:49701
} 
)
  
 

export default sequelize 