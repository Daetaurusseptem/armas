import path from 'path';
import fs from 'fs';



import { v4 as uuidv4 } from 'uuid';
import {Request, Response} from 'express';
import { empresas } from '../models/empresas';



export const fileUpload = async( req:Request, resp:Response ) => {
    const {empresaId, areaId, empleadoId} = req.params;
    const {nombre}   = req.body;
    let empresasValidas:any[] = []
    
    // Validar tipo
    await  (await empresas.findAll({ attributes: ['id'] })).forEach((r:any)=>{
        empresasValidas.push(r.id)
    })
    if ( !empresasValidas.includes(empresaId) ){
        return resp.status(400).json({
            ok: false,
            msg: 'Empresa no valida'
        });
    }
    console.log(req.files);
     // Validar que exista un archivo
     if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo',
            
            
        });
    }

    const file = req.files.archivo;
    
    

    const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    const extensionesValidas = ['png','jpg','jpeg','xls','xlsx', 'pdf','doc','docx'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return resp.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

  return resp.status(200).json({
    ok:true, 
    empresasValidas,
    nombreCortado,
    extensionArchivo
    
  })

    
}


