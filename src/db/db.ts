import {Sequelize} from 'sequelize';


const sequelize = new Sequelize('prueba','jaime','123',
{
    host:'localhost',
    dialect:'mssql',
    port:49673
}
)

export default sequelize  