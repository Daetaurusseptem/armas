import {Request, response, Response} from 'express';

import { areas } from '../models/areas';
import { configuraciones } from '../models/configuraciones';


export const getConfigs = async(req:Request, resp:Response) =>{
    const listaConfiguraciones = await configuraciones.findAll();
    
    return resp.json({
        ok:true,
        empleados:listaConfiguraciones
    })
}
export const createConfig =async (req:Request, resp:Response) =>{

    const nuevaConfig= req.body

    try {
        //Se busca si el id de la configuracion existe
        const config = await configuraciones.findByPk(nuevaConfig.id)
        if(config){
            return resp.status(400).json({
                ok:false,
                msg:'id config ya existe'
            })
        }
        //Si no existe se crea la configuacion
        const crearConfig = await configuraciones.create(req.body)
        crearConfig.save();

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

export const updateConfig= async (req:Request, resp:Response) => {
    const {configId }= req.params;
    

    const configExiste = await areas.findByPk(configId);

    if(!configExiste){
        return resp.status(400).json({
            ok:false,
            msg:'El id de la configuracion no existe'
        })
    }

    const updateConfig = await areas.update({where:{id:configId}},req.body)
}

