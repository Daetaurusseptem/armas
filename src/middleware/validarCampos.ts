import { NextFunction } from "express";
import { Response, Request }  from'express';

import { validationResult } from 'express-validator';


export const validarCampos = (req:Request, resp: Response, next:NextFunction) => {

    const errors:any = validationResult(req);

    if (!errors.isEmpty()) {
        return resp.status(404).json({
            ok: false, 
            errors: errors.mapped()
        })
    }

    next();

}
