
import {Request, Response} from 'express';
import { empleados } from '../models/empleados'
import { usuarios } from '../models/usuarios';

import Sequelize from 'sequelize';
import { areas } from '../models/areas';
import { empresas } from '../models/empresas';
import { departamentos } from '../models/departamentos';

const Op = Sequelize.Op

 exports.busquedaDocumentoColeccion = async(req:Request, resp:Response)=>{
     try {         
         const {busqueda} = req.params;
         const coleccionQuery = req.params.coleccion.toLowerCase()

         
         
         let data = []
         switch (coleccionQuery) {
             case 'usuarios':
                     data = await usuarios.findAll({include:areas,
                        where:{
                            [Op.or]: [
                              { usuario: { [Op.like]: `%${busqueda}%` } },
                              { nombre: { [Op.like]: `%${busqueda}%` } }
                            ]
                          }
                    })
                    return resp.status(200).json({
                      ok:true,
                      busqueda,
                      usuarios:data
                  }) 
                     break;
             case 'areas':
                data = await areas.findAll({
                    where:{
                        [Op.or]: [
                          { nombre: { [Op.like]: `%${busqueda}%` } },
                          { id: { [Op.like]: `%${busqueda}%` } }
                        ]
                      }
                })   
                return resp.status(200).json({
                  ok:true,
                  busqueda,
                  areas:data
              })         
                     break;
             case 'empresas':
                data = await empresas.findAll({
                    where:{
                        [Op.or]: [
                          { nombre: { [Op.like]: `%${busqueda}%` } },
                          { descripcion: { [Op.like]: `%${busqueda}%` } },
                          { id: { [Op.like]: `%${busqueda}%` } }
                        ]
                      }
                })  
                return resp.status(200).json({
                  ok:true,
                  busqueda,
                  empresas:data
              }) 
                     break;
             case 'departamentos':
                data = await departamentos.findAll({
                    where:{
                        [Op.or]: [
                          { nombre: { [Op.like]: `%${busqueda}%` } },
                          { descripcion: { [Op.like]: `%${busqueda}%` } },
                          { id: { [Op.like]: `%${busqueda}%` } }
                        ]
                      }
                }) 
                return resp.status(200).json({
                  ok:true,
                  busqueda,
                  departamentos:data
              }) 
                     break;
            //  case 'departamento':
            //          data = await Eventos.find({nombre:regEx})
            //                               .populate('realizadores');
            //          break;          
                 default:
                     return resp.status(400).json({
                         ok:false,
                         msg:"Coleccion invalida"
                     })                  
             }
                        
     }catch(error) {
         console.log(error);
         return resp.status(500).json({
             ok:false,
             msg:"Busqueda invalida"+error
         })      
     }

    }