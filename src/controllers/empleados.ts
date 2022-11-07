import { Request, Response } from "express";
import { Empleado } from "../interfaces/pures/empleado.interface";
import { empleados } from "../models/empleados";
import { empresas } from "../models/empresas";

import shortid from "shortid";
import { areas } from "../models/areas";
import { departamentos } from "../models/departamentos";
import { and, Op } from "sequelize";

export const getEmpleados = async (req: Request, resp: Response) => {
  try {
    const listaEmpleados = await empleados.findAll({ include: empresas });
    return resp.status(200).json({
      ok: true,
      empleados: listaEmpleados,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: true,
      msg: "Error inesperado",
    });
  }
};
export const getEmpleadosEmpresa = async (
  req: Request,
  resp: Response
) => {
  try {
    const { empresaId } = req.params;
    console.log("id empresa: ", empresaId);
    const listaEmpleados = await empleados.findAll({
      include: [empresas, departamentos],
      where: { empresaId }
    });

    return resp.json({
      ok: true,
      empleado: listaEmpleados,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: true,
      msg: "Hubo un error: " + error,
    });
  }
};
export const getEmpleadosDepartamento = async (
  req: Request,
  resp: Response
) => {
  try {
    const { departamentoId } = req.params;
    console.log("id departamento: ", departamentoId);
    const listaEmpleados = await empleados.findAll({
      include: [empresas, departamentos],
      where: { departamentoId: departamentoId },
    });

    return resp.json({
      ok: true,
      empleados: listaEmpleados,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: true,
      msg: "Hubo un error: " + error,
    });
  }
};
//GET - Comprobar si existe empleado con 
export const  getEmpleadoDepartamento = async(req:Request, resp:Response) => {

    try {
        console.log('sissssasa');
    const {numeroEmpleado, empresaId} = req.params

    const empleadoDepartamento = await empleados.findOne({where:{empresaId, numero_empleado:numeroEmpleado}})

    if(!empleadoDepartamento){
        return resp.status(200).json({
            ok:false,
            msg:'empleado no existe'
        })
    }

    return resp.status(200).json({
        ok:true,
        empleado:empleadoDepartamento
    })

    } catch (error) {
        return resp.status(500).json({
            ok:true,
            msg:error
        })
    }
}

export const getEmpleado = async (req: Request, resp: Response) => {
  const { idEmpleado } = req.params;
  try {
    const empleado = await empleados.findOne({
      include: [empresas, departamentos],
      where: { id: idEmpleado },
    });
    if (!empleado) {
      resp.status(404).json({
        ok: false,
        msg: "El empleado no existe",
      });
    }
    return resp.status(200).json({
      ok: true,
      empleados: empleado,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: true,
      msg: `Hubo un error inesperado: ${error}`,
    });
  }
};
export const createEmpleado = async (req: Request, resp: Response) => {
  const nuevoEmpleado = req.body;

  try {
    //Se busca si el empleado existe
    const empleado = await empleados.findByPk(nuevoEmpleado.id);
    if (empleado) {
      return resp.status(400).json({
        ok: false,
        msg: "empleado ya existe",
      });
    }
    console.log(req.body.numero_empleado, req.body.empresaId);
    //validacion empresa
    const empleadoMismaEmpresa = await empleados.findOne({
      where: {
        numero_empleado: req.body.numero_empleado,
        empresaId: req.body.empresaId,
      },
    });

    console.log(empleado);
    if (empleadoMismaEmpresa) {
      console.log("entro");
      return resp.status(400).json({
        ok: false,
        msg: "El empleado ya esta registrado en la empresa",
      });
    }
    req.body.id = shortid.generate();
    //Si no existe se crea el empleado
    const crearEmpleado = await empleados.create(req.body);

    crearEmpleado.save();

    return resp.status(200).json({
      ok: false,
      msg: "empleado creado exitosamente",
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      msg: "error inesperado: " + error,
    });
  }
};
export const updateEmpleado = async (req: Request, resp: Response) => {
  const { empleadoId } = req.params;

  const empleadoExiste = await empleados.findByPk(empleadoId);

  if (!empleadoExiste) {
    return resp.status(400).json({
      ok: false,
      msg: "Este empleado no existe",
    });
  }

  const updateEmpleado = await empleados.update(
    { where: { id: empleadoId } },
    req.body
  );
};
export const darDeBajaAlta = async (req: Request, resp: Response) => {
  try {
    const { idEmpleado } = req.params;
    console.log(idEmpleado);

    const empleadoDB = await empleados.findByPk(idEmpleado);

    const nombreUsuario = await empleadoDB?.getDataValue("nombre");

    console.log(nombreUsuario);

    if (!empleadoDB) {
      return resp.status(404).json({
        ok: false,
        msg: "error: El usuario no existe",
      });
    }
    if (empleadoDB.getDataValue("status")) {
      empleadoDB.update({ status: 0 });
    } else {
      empleadoDB.update({ status: 1 });
    }
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      msg: "error: " + error,
    });
  }
};
export const busquedaEmpleadoDepartamento = async (
  req: Request,
  resp: Response
) => {
  try {
    const { busqueda, departamentoId } = req.params;

    let data: any[] = [];

    data = await empleados.findAll({
      include: [departamentos, empresas],
      where: {
        where: { departamentoId },
        [Op.or]: [
          {
            numero_empleado: {
              [Op.like]: `%${busqueda}%`,
            },
          },
          {
            nombre: {
              [Op.like]: `%${busqueda}%`,
            },
          },
        ],
      },
    });

    return resp.status(200).json({
      ok: true,
      busqueda,
      departamentos: data,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      ok: false,
      msg: "Busqueda invalida" + error,
    });
  }
};
