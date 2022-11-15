import { expedientes } from './../models/expedientes';
import {Request, Response} from 'express';
import Sequelize from 'sequelize';


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