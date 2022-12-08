import { permisos } from './../models/permisos';
import { usuarios } from './../models/usuarios';
import {Request, Response} from 'express';
import { Empleado } from '../interfaces/pures/empleado.interface';
import { areas } from '../models/areas';
import { empleados } from '../models/empleados';
import { empresas } from '../models/empresas';
//GET - Obtener Areas
export const getAreas = async(req:Request, resp:Response) =>{
    const listaAreas = await areas.findAll();
    
    return resp.json({
        ok:true,
        areas:listaAreas
    })
}
export const getAreasEmpresa = async(req:Request, resp:Response) =>{
    try {
        const {empresaId}=req.params
        console.log('sdasdasd');
        const listaAreas = await areas.findAll({where:{empresaId:empresaId}});

        if(!listaAreas){
            return resp.status(404).json({
                ok:true,
                msg:"No se encontraron areas"
            })
        }

        console.log(listaAreas);
        
        return resp.status(200).json({
            ok:true,
            areas:listaAreas
        })
        
    } catch (error) {
        return resp.status(500).json({
            ok:false,
            msg:'Ocurrio un error inesperado'
        })
        
    }
}
//DELETE - Eliminar Permisos de Area de un usuario Indicado - Params: idArea, usuarioId
export const removeUsuarioPermisos = async(req:Request, resp:Response) =>{
    const {idArea, usuarioId} = req.params
    try {
        const user = await permisos.findOne({where:{areaId:idArea, usuarioId}})
        if(!user){
            return resp.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            })
        }
        const eliminarUsuario = await user.destroy();
        
        return resp.status(200).json({
            ok:true,
            msg:'permisos de area eliminados'
        })
        
    } catch (error) {
        return resp.status(500).json({
            ok:false,
            msg:"hubo unn error inesperado", error
        })
    }
}
export const eliminarArea = async(req:Request, resp:Response)=>{
    try {
        const {idArea} = req.params
        const areaDb = await areas.findByPk(idArea)
        if(!areaDb){
            resp.status(404).json({
                ok:false,
                msg:'El area no existe'
            })
        }

         await      areaDb?.destroy()

         resp.status(200).json({
            ok:true,
            msg:'El area ha sido eliminada'
        })
    } catch (error) {
        resp.status(500).json({
            ok:false,
            msg:'Hubo un error inesperado, el area que desea eliminar, contiene registros, elimine primero estos registros'
        })
    }
}
//GET - Obtener Area por id - params: idArea
export const getArea = async(req:Request, resp:Response) =>{
    const {idArea} = req.params
    try {
        const area = await areas.findByPk(idArea);
        
        return resp.status(200).json({
            ok:true,
            area
        })
        
    } catch (error) {
        return resp.status(500).json({
            ok:false,
            msg:"hubo unn error inesperado", error
        })
    }
}
//GET - Obtener Usuarios con permiso a la area - params: areaId
export const getAreaUsers = async(req:Request, resp:Response)=>{
        const {areaId} = req.params
    try {
        const areaUsers= await permisos.findAll({where:{areaId:areaId}})
        console.log(areaUsers);
        return resp.status(200).json({
            ok:true,
            areaID:areaId,
            users:areaUsers
        })
    } catch (error) {
        return resp.status(200).json({
            ok:false,
            msg:'Hubo un error inesperado'
        })
    }


}
//POST - Crear Area
export const createArea =async (req:Request, resp:Response) =>{

    const nuevoArea= req.body

    try {
        //Se busca si el empleado existe
        const area = await areas.findByPk(nuevoArea.id)
        if(area){
            return resp.status(400).json({
                ok:false,
                msg:'id area ya existe'
            })
        }
        //Si no existe se crea el empleado
        const crearArea = await areas.create(req.body)
        crearArea.save();

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
//PUT - Actualizar Area
export const updateArea= async (req:Request, resp:Response) => {
    const {idArea }= req.params;

    try {
        
    const areaExiste = await areas.findByPk(idArea);

    if(!areaExiste){
        return resp.status(400).json({
            ok:false,
            msg:'Esta area no existe'
        })
    }
    console.log(req.body);
    const updateArea = await areas.update(req.body, {where:{id:idArea}})
    return resp.status(200).json({
        ok:true, 
        msg:'Area actualizada'
    })
    } catch (error) {
        return resp.status(500).json({
            ok:true, 
            msg:'Error Inesperado '+error
        })
    }
}

