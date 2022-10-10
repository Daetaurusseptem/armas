import { Request, Response } from "express";
import { empresas } from "../models/empresas";

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