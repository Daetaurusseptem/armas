import express, { Application } from 'express'
import sequelize from '../db/db';
import routesEmpleados from '../routes/empleados.routes';
import routesEmpresas from '../routes/empresas.routes';
import routesUsers from '../routes/usuarios.routes';
import routesAreas from '../routes/areas.routes';
import {empleados} from '../models/empleados';
import {usuarios} from '../models/usuarios';
import { empresas } from './empresas';
import {areas} from '../models/areas';
import {permisos} from '../models/permisos';

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
        this.app.use('/api/areas', routesAreas )
    }
    middlewares(){
        this.app.use(express.json())
    }
    async dbConnect(){
        try { 
            empresas.sync({force:false})   
            empleados.sync({force:false}) 
            areas.sync({force:false}) 
            
            usuarios.sync({force:true}) 

            empleados.belongsTo(empresas, {
                constraints:true, 
                foreignKey:{
                    name:'empresaId', 
                    allowNull:false,
                }  
            
            })  
            areas.belongsToMany(usuarios,   {through:permisos, constraints:true, foreignKey:{name:'usuarioId', allowNull:false}})
            usuarios.belongsToMany(areas,   {through:permisos, constraints:true, foreignKey:{name:'areaId', allowNull:false}}) 
            
            empresas.sync({force:false})    
            empleados.sync({force:false}) 
            areas.sync({force:false})  
            permisos.sync({force:true})
            usuarios.sync({force:true}) 



            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error); 
          }
    } 
}