import { Request, Response } from "express";
import { empresas } from "../models/empresas";
//GET - Obtener Empresas
export const getEmpresas = async(req:Request, resp:Response) =>{
    const listaEmpresas = await empresas.findAll();
    
    return resp.json({
        ok:true,
        empresas:listaEmpresas
    })
}
//GET - Obtener Empresa - params: idEmpresa
export const getEmpresa = async(req:Request, resp:Response) =>{

    try {
        const {idEmpresa} = req.params
        const empresaDb = await empresas.findByPk(idEmpresa);

        if(!empresaDb){
            return resp.json({
                ok:false,
                msg:'No se encontro la empresa'
            })
        }
    
    return resp.status(200).json({
        ok:true,
        empresa:empresaDb
    })
    } catch (error) {
        return resp.json({
            ok:false,
            msg:'Hubo un error inesperado', error
        })
    }
    
}
//DELETE - Eliminar Empresa
export const deleteEmpresa = async(req:Request, resp:Response) =>{
    try {
        const {idEmpresa} = req.params;

        const empresaDb  = await empresas.findByPk(idEmpresa)
        if(!empresaDb){
            return resp.status(404).json({
                ok:false,
                msg:'No se encontró la empresa'
            })
        }
         await empresaDb.destroy();
         
        return resp.status(200).json({
            ok:true,
            msg:'La empresa ha sido eliminada exitosamente'
        })
        
    } catch (error) {
        
        return resp.status(500).json({
            ok:false,
            msg:'Hubo un error inesperado el elemento que desea eliminar contiene registros, elimínelos antes de proceder'
        })
    }
}
//POST - Crear Empresa
export const createEmpresa = async(req:Request, resp:Response)=>{
    
    const nuevoEmpresa= req.body

    try {
        //Se busca si el Empresa existe
        const Empresa = await empresas.findByPk(nuevoEmpresa.id)
        if(Empresa){
            return resp.status(400).json({
                ok:false,
                msg:'ID Empresa ya existe'
            })
        }       
        //Si no existe se crea el Empresa
        const crearEmpresa = await empresas.create(req.body)
        crearEmpresa.save();

        return resp.status(200).json({
            ok:false,
            msg:'Empresa creada exitosamente'
        })
        
    } catch (error) {
        
        return resp.status(500).json({
            ok:false,
            msg:'error inesperado: '+error
        })
    }
}

export const updateEmpresa= async (req:Request, resp:Response) => {
    

    try {
        
        const {idEmpresa} = req.params;
        

    const empresaExiste = await empresas.findByPk(idEmpresa);

    if(!empresaExiste){
        return resp.status(400).json({
            ok:false,
            msg:'Este empleado no existe'
        })
    }
    console.log(req.body);
    const updateEmpresa = await empresas.update(req.body, {where:{id:idEmpresa}})
    return resp.status(200).json({
        ok:false,
        msg:'Empresa actualizada'
    })

    } catch (error) {
        
        return resp.status(500).json({
            ok:false,
            msg:'Hubo un error inesperado'+ error
        })

    }
}

 