import {Request, response, Response} from 'express';
import { Empleado } from '../interfaces/pures/empleado.interface';
import { empleados } from '../models/empleados';
import { empresas } from '../models/empresas';

export const getEmpleados = async(req:Request, resp:Response) =>{
    const listaEmpleados = await empleados.findAll({include:empresas});
    
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

export const darDeBajaAlta =async(req:Request, resp:Response) =>{
    try {
        const {idEmpleado} = req.params;
        console.log(idEmpleado);
    
        const empleadoDB = await empleados.findByPk(idEmpleado)
        
        const nombreUsuario = await empleadoDB?.getDataValue('nombre');

        console.log(nombreUsuario);
    
        if(!empleadoDB){
            return resp.status(404).json({
                ok:false,
                msg:'error: El usuario no existe'
            })
        }
        if(empleadoDB.getDataValue("status")){

            empleadoDB.update({"status":0})
        }else{
            empleadoDB.update({"status":1})

        }
    } catch (error) {
        
    }
    
  


}

    