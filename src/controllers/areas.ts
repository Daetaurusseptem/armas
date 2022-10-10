import {Request, response, Response} from 'express';
import { Empleado } from '../interfaces/pures/empleado.interface';
import { areas } from '../models/areas';
import { empleados } from '../models/empleados';
import { empresas } from '../models/empresas';

export const getAreas = async(req:Request, resp:Response) =>{
    const listaAreas = await areas.findAll();
    
    return resp.json({
        ok:true,
        empleados:listaAreas
    })
}
export const createArea =async (req:Request, resp:Response) =>{

    const nuevoArea= req.body

    try {
        //Se busca si el empleado existe
        const area = await areas.findByPk(nuevoArea.id)
        if(area){
            return resp.status(400).json({
                ok:false,
                msg:'id area ya existe'
            })
        }
        //Si no existe se crea el empleado
        const crearArea = await areas.create(req.body)
        crearArea.save();

        return resp.status(200).json({
            ok:false,
            msg:'area creada exitosamente'
        })
        
    } catch (error) {
        
        return resp.status(500).json({
            ok:false,
            msg:'error inesperado: '+error
        })
    }


    

}

