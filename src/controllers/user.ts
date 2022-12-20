import {Request, Response} from 'express';
import { usuarios } from '../models/usuarios';
import bcrypt from 'bcrypt';
import shortId from'shortid'
import { areas } from '../models/areas';
import { permisos } from '../models/permisos';
import { where } from 'sequelize';
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
export const deleteUser = async(req:Request, resp:Response) =>{
    try {
        const {idUsuario} = req.params;
  
        const usuarioDb  = await usuarios.findByPk(idUsuario)
        if(!usuarioDb){
            return resp.status(404).json({
                ok:false,
                msg:'No se encontró el tipo de expedientes'
            })
        }
         await usuarioDb.destroy();
         
        return resp.status(200).json({
            ok:true,
            msg:'El usuario ha sido eliminado exitosamente'
        })
        
    } catch (error) {
        
        return resp.status(500).json({
            ok:false,
            msg:'Hubo un error inesperado el usuario que desea eliminar contiene registros'
        })
    }
  }

export const writeOrReadPermissions = async (req:Request, resp:Response) => {


    try {
        const {usuarioId, areaId} = req.params
        console.log(areaId);

        const userDB= await usuarios.findByPk(usuarioId)
        const areaDB= await areas.findByPk(areaId)

        if(!userDB){
            return resp.status(404).json({
                ok:false,
                msg:'Usuario No existe'
            })
        }
        if(!areaDB){
            return resp.status(404).json({
                ok:false,
                msg:'Area No existe'
            })
        }

        const comprobarPermiso = await permisos.findOne({where:{areaId, usuarioId}})

        if(!comprobarPermiso){
            return resp.status(404).json({
                ok:false,
                msg:'Permisos no disponibles'
            })
        }

        const tipo = comprobarPermiso.get('tipo')

        if(tipo=='e'){
            return resp.status(200).json({
                ok:true,
                tipo:'e'
            })
        }else  if(tipo=='l'){
            return resp.status(200).json({
                ok:true,
                tipo:'l'
            })
        }
        
        
    } catch (error) {
        return resp.status(500).json({
            ok:false,
            msg:`Hubo un error inesperado: ${error}`
        })
    }

}