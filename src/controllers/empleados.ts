import {Request, Response} from 'express';
import { Empleado } from '../interfaces/pures/empleado.interface';
import { empleados } from '../models/empleados';
import { empresas } from '../models/empresas'; 


import  shortid from 'shortid'

export const getEmpleados = async(req:Request, resp:Response) =>{
    const listaEmpleados = await empleados.findAll({include:empresas});
    
    return resp.json({
        ok:true,
        empleados:listaEmpleados
    })
}
export const getEmpleado = async(req:Request, resp:Response) =>{

    const {idEmpleado} = req.params
    const empleado = await empleados.findOne({where:{id:idEmpleado}});
    if(!empleado){
        resp.status(404).json({
            ok:false,
            msg:'El empleado no existe'
        })

    }

    return resp.json({
        ok:true,
        empleados:empleado
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
        console.log(req.body.numero_empleado, req.body.empresaId);
        //validacion empresa
        const empleadoMismaEmpresa = await empleados.findOne({where:{numero_empleado:req.body.numero_empleado, empresaId:req.body.empresaId}})

        console.log(empleado);
        if(empleadoMismaEmpresa){
            console.log('entro');
            return resp.status(400).json({
                ok:false,
                msg:'El empleado ya esta registrado en la empresa'
            })
        }
        req.body.id = shortid.generate();
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
export const updateEmpleado= async (req:Request, resp:Response) => {
    const {empleadoId}= req.params;

    const empleadoExiste = await empleados.findByPk(empleadoId);

    if(!empleadoExiste){
        return resp.status(400).json({
            ok:false,
            msg:'Este empleado no existe'
        })
    }

    const updateEmpleado = await empleados.update({where:{id:empleadoId}},req.body)
    
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
        return resp.status(500).json({
            ok:false,
            msg:'error: '+error
        })
    }
    
  


}

