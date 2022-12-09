import shortId from 'shortid'


import fs from 'fs';



import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { empresas } from '../models/empresas';
import fileUpload, { UploadedFile } from 'express-fileupload';
import { expedientes } from '../models/expedientes';
import { empleados } from '../models/empleados';

import {actualizarImagen} from '../helpers/actualizar-archivo';



export const subirArchivo = async (req: Request, resp: Response) => {
    try {

        const { empresaId, areaId, empleadoId, departamentoId } = req.params;
        const { nombre, nota, actualizo, tipo_expediente } = req.body;
        let empresasValidas: any[] = []
        const empleadoDB = await empleados.findByPk(empleadoId)
        if(!empleadoDB){
            return resp.status(404).json({
                ok: false,
                msg: 'Empleado no existe'
            });
        }
        const empNum = empleadoDB.get('numero_empleado')
        // Validar tipo
        await (await empresas.findAll({ attributes: ['id'] })).forEach((r: any) => {
            empresasValidas.push(r.id)
        })
        if (!empresasValidas.includes(empresaId)) {
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
    
        const file = req.files.archivo as UploadedFile
    
    
    
        const nombreCortado = file.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    
        const extensionesValidas = ['png', 'jpg', 'jpeg', 'xls', 'xlsx', 'pdf', 'doc', 'docx'];
        if (!extensionesValidas.includes(extensionArchivo)) {
            return resp.status(400).json({
                ok: false,
                msg: 'No es una extensión permitida'
            });
        }
        const nombreArchivo = `${nombreCortado[0]}.${extensionArchivo}`;
        //img path
        let path = `C:/expedientes/${empresaId}/${areaId}/${departamentoId}/${empNum}/${nombreArchivo}`;
    
        file.name = nombreArchivo;
     
        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                return resp.status(500).json({
                    ok: false,
                    msg: 'Ocurrio un error inesperado'
                });
            }
        })
    
        path = `${empresaId}/${areaId}/${departamentoId}/${empNum}/${nombreArchivo}`;
    
        const expediente = {
            id: shortId.generate(),
            nombre:nombreArchivo, 
            nota,
            actualizo,
            path,
            areaId,
            empresaId,
            empleadoId,
            tipo_expediente
        }
    
        const crearExpediente = await expedientes.create(expediente)
    
        crearExpediente.save();
    
    
    
    
    
    
        return resp.status(200).json({
            ok: true,
            path
    
        })
    
    } catch (error) {
        resp.status(500).json({
            ok:false,
            msg:`Hubo un error ineperado: ${error}`
        })
    }

 
}


export const subirImg = async( req:Request, resp: Response ) => {
    console.log('subir imagen');
    const {empresaId, empNum, empleadoId}= req.params


    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json({
            ok: false,
            msg: 'No hay ninguna imagen'
        });
    }

    // Procesar la imagen...
    const file = req.files.imagen as UploadedFile

    const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
    
    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return resp.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${nombreCortado[0]}.${ extensionArchivo }`;


    const empresaDb = await empresas.findByPk(empresaId)


    if(!empresaDb){
        return resp.status(404).json({
            ok:false,
            msg:'Empresa no existe'
        })
    }
    // Path para guardar la imagen
    const path = `C:/expedientes/fotos/${empresaId}/${empNum}/${nombreArchivo}`;
   
    // Mover la imagen
    file.mv( path , (err) => {
        if (err){
            console.log(err)
            return resp.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        actualizarImagen( empleadoId,empresaId,empNum,nombreArchivo);

        resp.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

}


exports.getArchivo = (req: Request, resp: Response) => {

    const { pathImg } = req.params



    //img por defecto
    if (fs.existsSync(pathImg)) {
        return resp.sendFile(pathImg)
    } else {
        return resp.status(200).json({

        })
    }
}

