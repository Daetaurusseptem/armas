import {Request, Response} from 'express';
import { departamentos } from '../models/departamentos';


export const getDepartamentos = async(req:Request, resp:Response) =>{
    const listaDepartamentos = await departamentos.findAll();
    
    return resp.json({
        ok:true,
        empleados:listaDepartamentos
    })
}
export const getDepartamento = async(req:Request, resp:Response) =>{
    const {idDepartamento} = req.params
    try {
        const departamento = await departamentos.findByPk(idDepartamento);
        if (!departamento) {
            return resp.status(404).json({
                ok:true,
                msg:'Departamento no existe'
            })
        }
        return resp.status(200).json({
            ok:true,
            departamento
        })
        
    } catch (error) {
        return resp.status(500).json({
            ok:false,
            msg:"hubo unn error inesperado: ", error
        })
    }
  
}
export const createDepartamentos =async (req:Request, resp:Response) =>{

    const nuevoDepartamento= req.body

    try {
        //Se busca si el empleado existe
        const area = await departamentos.findByPk(nuevoDepartamento.id)
        if(area){
            return resp.status(400).json({
                ok:false,
                msg:'id departamento ya existe'
            })
        }
        //Si no existe se crea el empleado
        const crearDepartamento = await departamentos.create(req.body)
        crearDepartamento.save();
 
        return resp.status(200).json({
            ok:false,
            msg:'departamento creado exitosamente'
        })
        
    } catch (error) {
        
        return resp.status(500).json({
            ok:false,
            msg:'error inesperado: '+error
        })
    }


    

}
export const updateDepartamento= async (req:Request, resp:Response) => {
    const {departamentoId}= req.params;

    const empresaExiste = await departamentos.findByPk(departamentoId);

    if(!empresaExiste){
        return resp.status(400).json({
            ok:false,
            msg:'Este empleado no existe'
        })
    }

    const updateDepartamento = await departamentos.update({where:{id:departamentoId}},req.body)
    
}


