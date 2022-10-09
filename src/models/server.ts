import express, { Application } from 'express'
import sequelize from '../db/db';
import routesEmpleados from '../routes/empleados.routes';
import routesUsers from '../routes/usuarios.routes';
import {empleados} from '../models/empleados';

export class Server{
    private app : Application
    port:string
    constructor(){
        this.app = express()
        this.port= process.env.PORT || "3000"
        this.dbConnect()
        this.listen()
        this.middlewares()
        this.routes()
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{console.log(`Listening in port ${this.port}`);})
    }
    routes(){
        this.app.use('/api/empleados', routesEmpleados)
        this.app.use('/api/users', routesUsers )
    }
    middlewares(){
        this.app.use(express.json())
    }
    async dbConnect(){
        try { 
            empleados.sync({alter:true})
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error); 
          }
    }
}