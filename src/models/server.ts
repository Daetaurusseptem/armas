import express, { Application } from 'express'
import expressFileUpload from 'express-fileupload';
import sequelize from '../db/db';
import routesEmpleados from '../routes/empleados.routes';
import routesEmpresas from '../routes/empresas.routes';
import routesUsers from '../routes/usuarios.routes';
import routesAreas from '../routes/areas.routes';
import routesPermisos from '../routes/permisos.routes';
import routesAuth from '../routes/auth.routes';
import routesDepartamentos from '../routes/departamentos.routes';
import routesBusqueda from '../routes/busqueda.routes';
import routesUploads from '../routes/uploads.routes';
import shortId from 'shortid';

const cors = require('cors')
const path = require('path');

export class Server{
    private app : Application;
    port:string;
    constructor(){
        this.app = express();
        this.port= process.env.PORT || "3000";
        this.dbConnect().catch(err=>console.log(err) ) ;
        this.listen();
        this.app.use(expressFileUpload());
        this.middlewares();
        this.routes();
        this.app.use(express.static('public'));
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
        this.app.use('/api/permisos', routesPermisos );
        this.app.use('/api/auth', routesAuth );
        this.app.use('/api/busqueda', routesBusqueda );
        this.app.use('/api/uploads', routesUploads );
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        
        
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