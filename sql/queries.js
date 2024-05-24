import {pool} from "../config/db.js";

//funcion agregar
async function agregarEstudiante(nombre, rut, curso, nivel) {
  const query = 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [nombre, rut, curso, nivel];

  try {
      const res = await pool.query(query, values);
      console.log(`Estudiante: ${res.rowCount} agregado con exito`);
      return res;
  } catch (err) {
      console.error('Error al agregar estudiante:', err);
      throw err;
  }
};

//funcion obtener por rut
async function obtenerEstudiantePorRut(rut) {
  const query = 'SELECT * FROM estudiantes WHERE rut = $1';

  try {
      const res = await pool.query(query, [rut]);
      console.log('Estudiante encontrado:', res.rows);
      return res.rows; 
  } catch (err) {
      console.error('Error al obtener estudiante:', err);
      throw err;
  }
}
//funcion obetener todos

async function obtenerEstudiantes() {
  const query = 'SELECT * FROM estudiantes';

  try {
      const res = await pool.query(query);
      console.log('Estudiantes registrados:', res.rows);
      return res.rows; 
  } catch (err) {
      console.error('Error al obtener estudiantes:', err);
      throw err;
  }
};

//funcion para editar
async function editarEstudiante(nombre, rut, curso, nivel) {
  const query = 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4';
  const values = [nombre, curso, nivel, rut];

  try {
      const res = await pool.query(query, values);
      console.log('Estudiante actualizado:', res.rowCount);
      return res.rowCount;
  } catch (err) {
      console.error('Error al actualizar estudiante:', err);
      throw err;
  }
};

//funcion para eliminar
async function eliminarEstudiante(rut) {
  const query = 'DELETE FROM estudiantes WHERE rut = $1';

  try {
      const res = await pool.query(query, [rut]);
      console.log('Estudiante eliminado:', res.rowCount);
      return res.rowCount; 
  } catch (err) {
      console.error('Error al eliminar estudiante:', err);
      throw err; 
  }
}

export {agregarEstudiante, obtenerEstudiantePorRut, obtenerEstudiantes, editarEstudiante, eliminarEstudiante}