import { Response, Request, NextFunction }  from'express';
import { usuarios } from '../models/usuarios';
const jwt  = require('jsonwebtoken');
 
export const validarJWT = (req : any, resp : Response, next:NextFunction)=>{
    
    const token = req.header('x-token');
    console.log(token);
    if(!token){
        return resp.status(401).json({
            ok:false,
            msg:`no hay token en la validacion`
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
    
        req.uid = uid;
        next();
        
    } catch (error) {
        return resp.status(401).json({
            ok:false, 
            msg:"token no valido"
        });
    }

}

export const validarADMIN_ROLE = async(req:any, resp:Response, next:any)  => {

    const uid = req.uid;
    
    try {
        console.log(uid);
        const usuarioDB = await usuarios.findByPk(uid );

        if ( !usuarioDB ) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.get('role') !== 'ADMIN_ROLE' ) {
            return resp.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();


    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}