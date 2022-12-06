import {Request, Response} from 'express';
import { usuarios } from '../models/usuarios';
import bcrypt from 'bcrypt';
import shortId from'shortid'
import { areas } from '../models/areas';
export const getUsers = async(req:Request, resp:Response) =>{
    try {
        const listaUsuarios = await usuarios.findAll({include:{model:areas}});
        
        return resp.json({
            ok:true,
            usuarios:listaUsuarios
        })
        
    } catch (error) {
        console.log(error);
        return resp.json({
            ok:false,
            msg:error
        })
    }
}
export const getUser = async(req:Request, resp:Response) =>{
    try {
        const {idUsuario} = req.params
        const Usuario = await usuarios.findOne({where:{id:idUsuario}, include:{model:areas}});
        
        if(!Usuario){
            return resp.status(404).json({
                ok:false, 
                msg:'No se encontro el usuario con id' + idUsuario
            })
        } 
        return resp.json({
            ok:true,
            usuario:Usuario
        })
        
    } catch (error) {
        console.log(error);
        return resp.json({
            ok:false,
            msg:'Hubo un error inesperado: '+error
        })
    }
}
export const createUser = async(req:Request, resp:Response) =>{
    try {
        
        req.body.id = shortId.generate();
        req.body.status = true 
        const nuevoUsuario=req.body;
        console.log(nuevoUsuario);

        const existeId = await usuarios.findByPk(req.body.id);
        const existeUser = await usuarios.findOne({where:{usuario:req.body.usuario}})
        console.log(existeUser);
        
        if(existeUser?.get('usuario')==req.body.usuario){
            console.log(existeUser);
            return resp.json({
                ok:false,
                msg:'usuario ya existe'
            })
        }

        //password encrypt
        // const salt = bcrypt.genSaltSync();
        // const passNotEncrypted = req.body.password
        // req.body.password = bcrypt.hashSync(passNotEncrypted, salt);

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
            msg:`error inesperado contacte a un administrador ${error}`
        })
    }
}
export const updateUser = async (req:Request, resp:Response) => {
    const {userId}= req.params;
    try {
        const userExiste = await usuarios.findByPk(userId);
        

    if(!userExiste){
        return resp.status(400).json({
            ok:false,
            msg:'Este empleado no existe'
        })
    }
    console.log(req.body);
    const updateUser = await usuarios.update(req.body, {where:{id:userId}})

    return resp.status(200).json({
        ok:true,
        msg:'Usuario Actualizado'
    })
    } catch (error) {
        return resp.status(400).json({
            ok:false,
            msg:'Error inesperado'+error
        })
    }
    
}