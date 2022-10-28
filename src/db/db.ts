import {Sequelize} from 'sequelize';
import { empleados } from '../models/empleados';
import { empresas } from '../models/empresas';


const sequelize = new Sequelize('prueba','sa','123',
{
    host:'localhost',
    dialect:'mssql',
    port: 49695
    //port laptop:49674 
    //port pc:49695
}
)
 


export default sequelize  