import { expedientes } from './../models/expedientes';
import { Request, Response } from 'express';
import Sequelize, { where } from 'sequelize';
import { empresas } from '../models/empresas';
import { areas } from '../models/areas';
import { tipo_expedientes } from '../models/tipo_expediente';
import shortId from 'shortid'
import fs from 'fs';



export const getExpedienteEmpleado = async (req: Request, resp: Response) => {
    const { empleadoId, areaId, empresaId } = req.params
    try {

        const expedienteEmpleado = await expedientes.findAll({ where: { empleadoId, areaId, empresaId },include:tipo_expedientes  })

        if (!expedienteEmpleado) {
            resp.status(404).json({
                ok: false,
                msg: 'Error: Empleado no existe'
            })
        }
        resp.status(200).json({
            ok: true,
            expedientes: expedienteEmpleado
        })
    } catch (error) {
        resp.status(200).json({
            ok: false,
            msg: 'Error'
        })
    }


}

export const getTiposExpedientesArea = async (req: Request, resp: Response) => {
    try {
        const { empresaId, areaId } = req.params
        const empresa = await empresas.findByPk(empresaId);
        const area = await areas.findByPk(areaId);
        if (!empresa) {
            return resp.status(400).json({
                ok: false,
                msg: 'Empresa no existe'
            })
        } else
            if (!area) {
                return resp.status(400).json({
                    ok: false,
                    msg: 'Area no existe'
                })
            }

        const tipoExpArea = await tipo_expedientes.findAll({ where: { areaId } })
        return resp.status(200).json({
            ok: true,
            tiposExpediente: tipoExpArea
        })



    } catch (error) {
        console.log(error);

        return resp.status(400).json({
            ok: false,
            msg: error
        })
    }
}

export const crearTipoExpedienteArea = async (req: Request, resp: Response) => {

    try {


        const { tipo, descripcion, actualizo, obligatorio } = req.body
        const id_tipo = shortId.generate();
        const { empresaId, areaId } = req.params

        const empresa = await empresas.findByPk(empresaId)

        if (!empresa) {
            return resp.status(404).json({
                ok: false,
                msg: 'Empresa no existe'
            })
        }


        const crearTipoExpedienteAreaBD = await tipo_expedientes.create({
            tipo, descripcion, actualizo, areaId, id_tipo,obligatorio
        })


        crearTipoExpedienteAreaBD.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Tipo expediente creado satisfactoriamente'
        })


    } catch (error) {
        return resp.status(500).json({
            ok: true,
            msg: 'Error inesperado' + error
        })
    }

}
export const eliminarExpediente = async (req: Request, resp: Response) => {
    try {
        const { idExpediente } = req.params;
        console.log(idExpediente);
        const expedientDB = await expedientes.findByPk(idExpediente);
        console.log(expedientDB);
        const path = expedientDB!.get('path')
        const pathAbsoluto = `C:/expedientes/${path}`

        if (!expedientDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe el expediente'
            })
        }
        fs.unlinkSync(pathAbsoluto)
        expedientDB.destroy();
        
            return resp.status(200).json({
                ok: true,
                msg: 'Expediente eliminado',
                pathAbsoluto
            })
        
    } catch (error) {
        resp.status(500).json({
            ok: true,
            msg: 'Error:' + error,

        })
    }




}

export const getExpedientesObligatorios = async (req: Request, resp: Response) => {
    try {
        const { empresaId, areaId } = req.params
        const empresa = await empresas.findByPk(empresaId);
        const area = await areas.findByPk(areaId);
        if (!empresa) {
            return resp.status(400).json({
                ok: false,
                msg: 'Empresa no existe'
            })
        } else
            if (!area) {
                return resp.status(400).json({
                    ok: false,
                    msg: 'Area no existe'
                })
            }

        const tipoExpArea = await tipo_expedientes.findAll({ where: { areaId, obligatorio:true } })
        return resp.status(200).json({
            ok: true,
            tiposExpediente: tipoExpArea
        })



    } catch (error) {
        console.log(error);

        return resp.status(400).json({
            ok: false,
            msg: error
        })
    }
}