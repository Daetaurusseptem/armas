import {Request, response, Response} from 'express';
import { Empleado } from '../interfaces/pures/empleado.interface';
import { areas } from '../models/areas';
import { departamentos } from '../models/departamento';


export const getDepartamentos = async(req:Request, resp:Response) =>{
    const listaDepartamentos = await departamentos.findAll();
    
    return resp.json({
        ok:true,
        empleados:listaDepartamentos
    })
}
export const createDepartamentos =async (req:Request, resp:Response) =>{

    const nuevoDepartamento= req.body

    try {
        //Se busca si el empleado existe
        const area = await areas.findByPk(nuevoDepartamento.id)
        if(area){
            return resp.status(400).json({
                ok:false,
                msg:'id area ya existe'
            })
        }
        //Si no existe se crea el empleado
        const crearDepartamento = await areas.create(req.body)
        crearDepartamento.save();

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

