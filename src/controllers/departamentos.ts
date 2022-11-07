import { empresas } from './../models/empresas';
import {Request, Response} from 'express';
import { departamentos } from '../models/departamentos';


export const getDepartamentos = async(req:Request, resp:Response) =>{
    try {
        const listaDepartamentos = await departamentos.findAll();
        
        return resp.status(200).json({
            ok:true,
            departamentos:listaDepartamentos
        })
        
    } catch (error) {
        
        return resp.status(404).json({
            ok:false,
            msg:'Hubo un error inesperado'+error
        })
    }
}
export const getDepartamentoEmpresaId = async(req:Request, resp:Response) =>{
    try {
        const {empresaId}=req.params

        const empresa = await departamentos.findAll({where:{empresaId}})

        if(!empresa){
            return resp.status(404).json({
                ok:false,
                msg:'Empresa no existe'
            })
        }

        const listaDepartamentos = await departamentos.findAll({where:{empresaId}});
        
        
        return resp.status(200).json({
            ok:true,
            departamentos:listaDepartamentos
        })
        
    } catch (error) {
        
        return resp.status(404).json({
            ok:false,
            msg:'Hubo un error inesperado'+error
        })
    }
}
export const getDepartamento = async(req:Request, resp:Response) =>{
    const {idDepartamento} = req.params
    console.log(idDepartamento);
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


