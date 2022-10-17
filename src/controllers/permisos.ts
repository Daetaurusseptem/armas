import { Request, Response } from "express"
import { areas } from "../models/areas";
import { permisos } from "../models/permisos";
import { usuarios } from "../models/usuarios";


export const agregarPermiso =async(req:Request, resp:Response)=>{
    
    const {idUsuario, idArea, tipo} =req.params;
    

    const areaDB = await areas.findByPk(idArea);
    
    const usuarioDB = await usuarios.findByPk(idUsuario);

    if(!usuarioDB){
        return resp.status(404).json({
            ok:false,
            msg:'No se encontro el usuario, verifique el id'
        })
    }
    if(!areaDB){
        return resp.status(404).json({
            ok:false,
            msg:'No se encontro el area, verifique el id'
        })
    }

    //checar permisos
    const permisosDB = await permisos.findOne({where:{usuarioId:idUsuario, areaId:idArea}})

    if(permisosDB){
        permisosDB.destroy()
        permisosDB.save()
        return resp.status(200).json({
            ok:true,
            msg:'Permisos revocados'
        })
    }else{
        const crearPrivilegios =  await permisos.create({usuarioId:idUsuario, areaId:idArea, tipo})
        await crearPrivilegios.save();
        return resp.status(200).json({
            ok:false,
            msg:'Permisos Agregados'
        })
    }
    
}