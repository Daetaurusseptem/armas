import { usuarios } from './../models/usuarios';
import { generarJWT } from "../helpers/jwt";
const bcrypt = require('bcrypt');
const { getMenuFrontEnd } = require("../helpers/menu-frontend");
import {Request, Response} from 'express';
import { areas } from '../models/areas';



export const login = async  (req:Request, resp:Response)=>{
    
    
    const {usuario, password} = req.body

    
    try {
        
        const usuarioDB = await usuarios.findOne({where:{usuario}})

        if(!usuarioDB){
            return resp.status(404).json({
                ok:false,
                msg:'Datos no validos'
            })
        }

        // const validPassword = bcrypt.compareSync(password, usuarioDB.getDataValue('password'));
        // if(!validPassword){
        //     return resp.status(400).json({
        //         ok:false,
        //         msg:'password invalido'
        //     })
        // }
        if(password!=usuarioDB.getDataValue('password')){
            return resp.status(400).json({
                ok:false,
                msg:'Datos no validos'
            })
        }
        
        const token = await generarJWT(usuarioDB.getDataValue('id'));
        return resp.status(200).json({
            ok:true,
            token,
            menu:getMenuFrontEnd(usuarioDB.getDataValue('role'))
        })


    } catch (error) {

        return resp.status(500).json({
            okay:false,
            msg:'Porfavor hable con el administrador'+error
        })
    }


}

export const renewToken = async(req:any, resp:Response)=>{

    const uid = req.uid;

    const token =await generarJWT(uid);

    //return user
    console.log("sd",uid);
    let usuario = await usuarios.findByPk(uid,{include:[areas]});    


    return resp.status(200).json({
        ok:true,
        token,
        uid,
        usuario,
        menu:getMenuFrontEnd(usuario?.getDataValue('role'))

    });


}