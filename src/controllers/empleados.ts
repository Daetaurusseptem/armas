import {Request, response, Response} from 'express';
import { empleados } from '../models/empleados';

export const getEmpleados = async(req:Request, resp:Response) =>{
    const listaEmpleados = await empleados.findAll();
    return resp.json({
        ok:true,
        empleados:listaEmpleados
    })
}
export const createEmpleado =async (req:Request, resp:Response) =>{

    const nuevoEmpleado= req.body

    try {
        //Se busca si el empleado existe
        const empleado = await empleados.findByPk(nuevoEmpleado.id)
        if(empleado){
            return resp.status(400).json({
                ok:false,
                msg:'empleado ya existe'
            })
        }
        //Si no existe se crea el empleado
        const crearEmpleado = await empleados.create(req.body)
        crearEmpleado.save();

        return resp.status(200).json({
            ok:false,
            msg:'empleado creado exitosamente'
        })
        
    } catch (error) {
        
        return resp.status(500).json({
            ok:false,
            msg:'error inesperado: '+error
        })
    }


    

}