import {Request, response, Response} from 'express';

export const createUser = (req:Request, resp:Response) =>{
    console.log(req.body);
    return resp.json({
        ok:true,
        body:req.body
    })
}
export const login = (req:Request, resp:Response) =>{
    return resp.json({
        ok:true,
        msg:"Inicio sesion",
        body:req.body
    })
}