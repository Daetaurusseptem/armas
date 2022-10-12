import express, { Application } from 'express'
import sequelize from '../db/db';
import routesEmpleados from '../routes/empleados.routes';
import routesEmpresas from '../routes/empresas.routes';
import routesUsers from '../routes/usuarios.routes';
import routesAreas from '../routes/areas.routes';
import routesDepartamentos from '../routes/departamentos.routes';
import shortId from 'shortid';

export class Server{
    private app : Application;
    port:string;
    constructor(){
        this.app = express();
        this.port= process.env.PORT || "3000";
        this.dbConnect().catch(err=>console.log(err) ) ;
        this.listen();
        this.middlewares();
        this.routes();
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{console.log(`Listening in port ${this.port}`);})
    }
    routes(){
        this.app.use('/api/empleados', routesEmpleados);
        this.app.use('/api/usuarios', routesUsers);
        this.app.use('/api/empresas', routesEmpresas );
        this.app.use('/api/areas', routesAreas );
        this.app.use('/api/departamentos', routesDepartamentos );
    }
    middlewares(){
        this.app.use(express.json());
    }
    async dbConnect(){
        try { 
            require('../db/assotiations');
            
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error); 
          }
    } 
} 