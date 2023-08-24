/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Departamentos
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */
import Departamento from "../models/departamento.js";
import { throwInvalidArgsError, throwInvalidIDError, throwNotFoundException } from "../utilities/errorHandler.js";

/**
 * Obtiene de la base de datos la lista de todos los departamentos o secciones de la regional
 * @returns Un arreglo con todos los departamento de la BD
 */
export async function getAllDepartamentos(){
  return Departamento.find();
}

/**
 * Busca en la base de datos por un departamento en especifico y devuelve su informacion
 * @param {string} idDepartamento el ID unico del departamento del cual se requiere informacion
 * @returns un documento JSON con la informacion del departamento seleccionado
 */
export async function getDepartamentoById(idDepartamento){
  return Departamento.findById(idDepartamento).catch((error) => throwInvalidIDError("Departamento", error.message));
}

/**
 * Obtiene de la base de datos la lista de todos los departamentos o secciones de la regional
 * @returns Un arreglo con todos los departamento de la BD
 */
export async function crearDepartamento({nombre, urlLogo}){
  const departamento = new Departamento({
    nombre, 
    urlLogo
  });

  return departamento.save().catch((error) => throwInvalidArgsError(error.message));
}


export async function modificarDepartamento({idDepartamento, nombre, urlLogo}){
  const departamento = await getDepartamentoById(idDepartamento);
  if(!departamento) return throwNotFoundException("Departamento");

  departamento.nombre = nombre;
  departamento.urlLogo = urlLogo;

  return departamento.save().catch((error) => throwInvalidArgsError(error.message));
}


export async function eliminarDepartamento({idDepartamento}){
  const departamento = await getDepartamentoById(idDepartamento);
  if(!departamento) return throwNotFoundException("Departamento");

  return departamento.delete();
}
