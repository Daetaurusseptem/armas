import express, { Application } from 'express'
import sequelize from '../db/db';
import routesEmpleados from '../routes/empleados.routes';
import routesEmpresas from '../routes/empresas.routes';
import routesUsers from '../routes/usuarios.routes';
import {empleados} from '../models/empleados';
import { empresas } from './empresas';

export class Server{
    private app : Application
    port:string
    constructor(){
        this.app = express()
        this.port= process.env.PORT || "3000"
        this.dbConnect().catch(err=>console.log(err) ) 
        this.listen()
        this.middlewares()
        this.routes()
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{console.log(`Listening in port ${this.port}`);})
    }
    routes(){
        this.app.use('/api/empleados', routesEmpleados)
        this.app.use('/api/usuarios', routesUsers)
        this.app.use('/api/empresas', routesEmpresas )
    }
    middlewares(){
        this.app.use(express.json())
    }
    async dbConnect(){
        try { 
            empresas.hasOne(empleados, {
                foreignKey:{
                    name:'empresaId',
                    allowNull:false 
                }
            }) 
 

            empresas.sync({force:false})  
            empleados.sync({force:false}) 


            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error); 
          }
    } 
}