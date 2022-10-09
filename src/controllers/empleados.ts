import {Request, response, Response} from 'express';

export const getEmpleados = (req:Request, resp:Response) =>{
    return resp.json({
        ok:true,
        msg:'Productos'
    })
}