import {Request, response, Response} from 'express';
import { usuarios } from '../models/usuarios';

export const createUser = async(req:Request, resp:Response) =>{
    try {
        
        const {nuevoUsuario}=req.body;

        const existeId = await usuarios.findByPk(req.body.id);

        if(existeId){
            return resp.json({
                ok:true,
                body:req.body
            })
        }

        const crearUsuario = await usuarios.create(nuevoUsuario)
        crearUsuario.save();

        console.log(req.body);
        return resp.status(200).json({
            ok:true,
            body:req.body
        })

    } catch (error) {
        return resp.status(500).json({
            ok:true,
            msg:`error inesperado ${error}`
        })
    }
}
export const updateUser = async (req:Request, resp:Response) => {
    const {userId}= req.params;

    const userExiste = await usuarios.findByPk(userId);

    if(!userExiste){
        return resp.status(400).json({
            ok:false,
            msg:'Este empleado no existe'
        })
    }

    const updateUser = await usuarios.update({where:{empresaId:userId}},req.body)
}
export const login = (req:Request, resp:Response) =>{
    //SIN ENCRIPTAR CONTRASENAS
    return resp.json({
        ok:true,
        msg:"Inicio sesion",
        body:req.body
    }) 
}