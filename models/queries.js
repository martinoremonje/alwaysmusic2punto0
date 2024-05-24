import {pool} from "../config/db.js";



//funcion agregar
async function agregarEstudiante(nombre, rut, curso, nivel) {

  try {
      const sql = {
        text: 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [nombre, rut, curso, nivel]
      }
      const res = await pool.query(sql);
      console.log(`Estudiante: ${res.rowCount} agregado con exito`);
  } catch (err) {
      console.error('Error al agregar estudiante:', err);
      throw err;
  }
};

//funcion obtener por rut
async function obtenerEstudiantePorRut(rut) {
 

  try {
    const sql = {
      text: 'SELECT * FROM estudiantes WHERE rut = $1',
      values: [rut]
    } 
      const res = await pool.query(sql);
      console.log('Estudiante encontrado:', res.rows);
  } catch (err) {
      console.error('Error al obtener estudiante:', err);
      throw err;
  }
}
//funcion obetener todos

async function obtenerEstudiantes() {

  try {
    const sql = {
      text: 'SELECT * FROM estudiantes',
      rowMode: "array"
    } 
      const response = await pool.query(sql);
      console.log(response.rows)
  } catch (err) {
      console.error('Error al obtener estudiantes:', err);
      throw err;
  }
};

//funcion para editar
async function editarEstudiante(nombre, rut, curso, nivel) {
  

  try {
    const sql = {
      text:'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4',
      values: [nombre, rut, curso, nivel]
    } 
      const res = await pool.query(sql);
      console.log('Estudiante actualizado:', res.rowCount);

  } catch (err) {
      console.error('Error al actualizar estudiante:', err);
      throw err;
  }
};

//funcion para eliminar
async function eliminarEstudiante(rut) {


  try {
    const sql = {
      text: 'DELETE FROM estudiantes WHERE rut = $1',
      values: [rut]
    } ;
      const res = await pool.query(sql);
      console.log('Estudiante eliminado:', res.rowCount);
  } catch (err) {
      console.error('Error al eliminar estudiante:', err);
      throw err; 
  }
}

export {agregarEstudiante, obtenerEstudiantePorRut, obtenerEstudiantes, editarEstudiante, eliminarEstudiante}