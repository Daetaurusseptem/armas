import { expedientes } from './../models/expedientes';
import { Request, Response } from "express";
import { Empleado } from "../interfaces/pures/empleado.interface";
import { empleados } from "../models/empleados";
import { empresas } from "../models/empresas";
import Sequelize from 'sequelize';

import shortid from "shortid";
import { areas } from "../models/areas";
import { departamentos } from "../models/departamentos";

const Op = Sequelize.Op

//*GET - Obtener todos los empleados de todas las empresas
export const getEmpleados = async (req: Request, resp: Response) => {
  try {
    const listaEmpleados = await empleados.findAll({ include: [empresas, departamentos], });
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
//*GET - Obtener empleados de una empresa - params empresaId
export const getEmpleadosEmpresa = async (
  req: Request,
  resp: Response
) => {
  try {
    const { empresaId } = req.params;
    console.log("id empresa: ", empresaId);
    const listaEmpleados = await empleados.findAll({
      include: [empresas, departamentos,expedientes],
      where: { empresaId }
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
//*GET - Obtener empleados por deparrtamento -params: empleadoId
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
//*GET - Buscar empleados con termino - campos tabla busqueda: numeroEmpleado, nombre  - params: idEmpleado
export const busquedaEmpleadoEDepartamento = async (
  req: Request,
  resp: Response
) => {
  const { empresaId } = req.params;
  
  const { departamentoId, busqueda } = req.query
  
  try {
    let data: any[] = [];
    console.log(empresaId);

    //*Si departamentoId y busqueda
    if (departamentoId !== undefined && busqueda!==undefined) {
      console.log('si dep '+departamentoId, busqueda);
      data = await empleados.findAll({
        include: [departamentos, empresas, expedientes],
        
        where: {
         [Op.and]:[
          {empresaId}, {departamentoId}
         ]
          ,
          [Op.or]: [

            {numero_empleado: {[Op.like]: `%${busqueda}%`}},
            {
              nombre: {
                [Op.like]: `%${busqueda}%`,
              },
            },
          ]},
      });
    }

    else if(departamentoId==undefined && busqueda!==undefined){
      console.log('ej ejta');
      data = await empleados.findAll({
        include: [departamentos, empresas, expedientes],
        where: {
            empresaId
          ,
          [Op.or]: [
  
            {numero_empleado: {[Op.like]:`%${busqueda}%`}},
            {nombre: {[Op.like]: `%${busqueda}%`},}
          ]}
        }
      );
    } else if(departamentoId!==undefined){
      data = await empleados.findAll(
        
        {
          include: [departamentos, empresas, expedientes],
          where:{departamentoId , empresaId}
        }
      )
    }

   
    return resp.status(200).json({
      ok: true,
      busqueda,
      departamentoId,
      empleados: data

    });
  } catch (error) {


    console.log(error);
    return resp.status(500).json({
      ok: false,
      msg: "Busqueda invalida" + error,
    });
  }

};
//*GET - Obtener empleado por empresa - params: empresaId
export const getEmpleadoDepartamento = async (req: Request, resp: Response) => {

  try {
    console.log('sissssasa');
    const { numeroEmpleado, empresaId } = req.params

    const empleadoDepartamento = await empleados.findOne({ where: { empresaId, numero_empleado: numeroEmpleado } })

    if (!empleadoDepartamento) {
      return resp.status(200).json({
        ok: false,
        msg: 'empleado no existe'
      })
    }

    return resp.status(200).json({
      ok: true,
      empleado: empleadoDepartamento
    })

  } catch (error) {
    return resp.status(500).json({
      ok: true,
      msg: error
    })
  }
}
//*GET - Obtener empleado por Id - params: empleadoId
export const getEmpleado = async (req: Request, resp: Response) => {
  const { empleadoId } = req.params;
  try {
    const empleado = await empleados.findByPk(empleadoId, { include: [empresas, departamentos] });
    if (!empleado) {
      resp.status(404).json({
        ok: false,
        msg: "El empleado no existe",
      });
    }
    return resp.status(200).json({
      ok: true,
      empleado: empleado,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: true,
      msg: `Hubo un error inesperado: ${error}`,
    });
  }
};
//*POST - Crear Empleado 
export const createEmpleado = async (req: Request, resp: Response) => {
  const { numero_empleado, empresaId } = req.body;

  try {
    //Se busca si el empleado existe
    const empleadoExiste = await empleados.findOne({ where: { numero_empleado, empresaId } });
    if (empleadoExiste) {
      return resp.status(400).json({
        ok: false,
        msg: "empleado ya existe en la empresa",
      });
    }
    console.log(req.body.numero_empleado, req.body.empresaId);
    //validacion empresa

    req.body.id = shortid.generate();
    console.log(req.body);
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
//*PUT - Actualizar Empleado - params: idEmpleado
export const updateEmpleado = async (req: Request, resp: Response) => {
  const { idEmpleado } = req.params;


  try {
    const empleadoExiste = await empleados.findByPk(idEmpleado);

    if (!empleadoExiste) {
      return resp.status(400).json({
        ok: false,
        msg: "Este empleado no existe",
      });
    }


    const updateEmpleado = await empleados.update(req.body, { where: { id: idEmpleado } });
    return resp.status(200).json({
      ok: true,
      msg: "Empleado Actualizado",
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      msg: "Hubo un error inesperado" + error
    });
  }



};
//*PUT - Switch Estatus Empleado - params: idEmpleado
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


//*DELETE EMPLEADO

export const deleteEmpleado = async(req:Request, resp:Response) =>{
  try {
      const {idEmpleado} = req.params;

      const empleadoDb  = await empleados.findByPk(idEmpleado)
      if(!empleadoDb){
          return resp.status(404).json({
              ok:false,
              msg:'No se encontró el empleado'
          })
      }
       await empleadoDb.destroy();
       
      return resp.status(200).json({
          ok:true,
          msg:'El empleado ha sido eliminado exitosamente'
      })
      
  } catch (error) {
      
      return resp.status(500).json({
          ok:false,
          msg:'Hubo un error inesperado el elemento que desea eliminar contiene registros'
      })
  }
}

