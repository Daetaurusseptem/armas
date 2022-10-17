"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// exports.busquedaDocumentoColeccion = async(req:Request, resp:Response)=>{
//     try {
//         const busquedaQuery = req.params.busqueda;
//         const coleccionQuery = req.params.coleccion.toLowerCase();
//         const regEx = new RegExp(busquedaQuery, 'i')
//         let data = [];
//         switch (coleccionQuery) {
//             case 'empleados':
//                     data = await empleados.findAll({nombre:{regEx}, role:'alumno'})
//                                        .populate('materia')
//                     break;
//             case 'areas':
//                     data = await Usuarios.find({nombre:regEx, role:'maestros'})
//                     break;
//             case 'empresas':
//                     data = await Materias.find({nombre:regEx})
//                                          .populate('administradores')
//                                          .populate('inscritos');
//                     break;
//             case 'departamento':
//                     data = await Eventos.find({nombre:regEx})
//                                          .populate('realizadores');
//                     break;
//                 default:
//                     return resp.status(400).json({
//                         ok:false,
//                         msg:"Coleccion invalida"
//                     })
//             }
//             return resp.status(200).json({
//                 ok:true,
//                 busquedaQuery,
//                 resultados:data
//             })
//     }catch(error) {
//         console.log(error);
//         return resp.status(500).json({
//             ok:false,
//             msg:"Busqueda invalida"+error
//         })
//     }
// }
