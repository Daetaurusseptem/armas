import shortId from 'shortid'

import path from 'path';
import fs from 'fs';



import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { empresas } from '../models/empresas';
import { UploadedFile } from 'express-fileupload';
import { expedientes } from '../models/expedientes';



export const subirArchivo = async (req: Request, resp: Response) => {
    try {

        const { empresaId, areaId, empleadoId, departamentoId } = req.params;
        const { nombre, nota, actualizo, tipo_expediente } = req.body;
        let empresasValidas: any[] = []
    
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
        let path = `C:/expedientes/${empresaId}/${areaId}/${departamentoId}/${empleadoId}/${nombreArchivo}`;
    
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
    
        path = `${empresaId}/${areaId}/${departamentoId}/${empleadoId}/${nombreArchivo}`;
    
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

