import { expedientes } from './../models/expedientes';
import {Request, Response} from 'express';
import Sequelize from 'sequelize';
import { empresas } from '../models/empresas';
import { areas } from '../models/areas';
import { tipo_expedientes } from '../models/tipo_expediente';
import shortId from'shortid'


export const getExpedienteEmpleado = async(req:Request, resp:Response)=>{
    const {empleadoId, areaId, empresaId} = req.params
    try {

        const expedienteEmpleado = await expedientes.findAll({where:{empleadoId, areaId, empresaId}})
        
        if(!expedienteEmpleado){
            resp.status(404).json({
                ok:false,
                msg:'Error: Empleado no existe'
            })
        }
        resp.status(200).json({
            ok:true,
            expedientes:expedienteEmpleado
        })
    } catch (error) {
        resp.status(200).json({
            ok:false,
            msg:'Error'
        })
    }


}

export const getTiposExpedientesArea = async(req:Request, resp:Response)=>{
    try {
        const {empresaId, areaId} = req.params
        const empresa = await empresas.findByPk(empresaId);
        const area = await areas.findByPk(areaId);
        if(!empresa){
            return resp.status(400).json({
                ok:false,
                msg:'Empresa no existe'
            })
        }else
        if(!area){
            return resp.status(400).json({
                ok:false,
                msg:'Area no existe'
            })
        }

        const areasEmpresa = await areas.findAll({where:{empresaId}})

        const areasEmpresaArray = areasEmpresa.map((r:any)=>{
            return r.id
        })

        const tiposExpedientes = await tipo_expedientes.findAll()
        
        const tipos = tiposExpedientes.map((tipo:any)=>{
            if(areasEmpresaArray.includes(tipo.areaId)){
                console.log(tipo);
                return tipo
            }
        })

        console.log(tipos);
    
        return resp.status(200).json({
            ok:true,
            tiposExpediente:tipos
        })


    } catch (error) {
        return resp.status(400).json({
            ok:false,
            msg:error
        })
    }
}

export const crearTipoExpedienteArea = async(req:Request, resp:Response)=>{

    try {

        
        const {tipo, descripcion, actualizo} = req.body
        const id_tipo = shortId.generate();
        const {empresaId, areaId}=req.params

        const empresa = await empresas.findByPk(empresaId)

        if(!empresa){
            return resp.status(404).json({
                ok:false,
                msg:'Empresa no existe'
            })
        }
    
    
        const crearTipoExpedienteAreaBD = await tipo_expedientes.create({
            tipo, descripcion, actualizo, areaId, id_tipo
        })


        crearTipoExpedienteAreaBD.save();

        return resp.status(200).json({
            ok:true,
            msg:'Tipo expediente creado satisfactoriamente'
        })
    
        
    } catch (error) {
        return resp.status(500).json({
            ok:true,
            msg:'Error inesperado'+error
        })
    }
    
}