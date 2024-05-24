import express from "express";
import {agregarEstudiante, obtenerEstudiantePorRut, obtenerEstudiantes, editarEstudiante, eliminarEstudiante} from "../sql/queries.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/agregar", async (req, res) => {
    const { nombre, rut, curso, nivel } = req.body;

    if (!nombre || !rut || !curso || !nivel) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    try {
        const data = await agregarEstudiante(nombre, rut, curso, nivel);
        res.json(data.rows);
    } catch (error) {
        console.error("Se produjo un error:", error);
        res.status(500).send('Error agregando estudiante');
    }
});

router.get("/estudiantes", async (req, res) => {
    try {
        const estudiantes = await obtenerEstudiantes();
        res.json(estudiantes);
    } catch (error) {
        console.error("Se produjo un error:", error);
        res.status(500).send('Error obteniendo estudiantes');
    }
});

router.get("/estudiante/:rut", async (req, res) => {
    const { rut } = req.params;

    try {
        const estudiante = await obtenerEstudiantePorRut(rut);
        if (estudiante.length === 0) {
            res.status(404).send('Estudiante no encontrado');
        } else {
            res.json(estudiante);
        }
    } catch (error) {
        console.error("Se produjo un error:", error);
        res.status(500).send('Error obteniendo estudiante');
    }
});

router.get("/editar", async (req, res) => {
    const { nombre, rut, curso, nivel } = req.query;

    if (!nombre || !rut || !curso || !nivel) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    try {
        const rowCount = await editarEstudiante(nombre, rut, curso, nivel);
        if (rowCount === 0) {
            res.status(404).send('Estudiante no encontrado');
        } else {
            res.send('Estudiante actualizado correctamente');
        }
    } catch (error) {
        console.error("Se produjo un error:", error);
        res.status(500).send('Error actualizando estudiante');
    }
});

router.get("/eliminar/:rut", async (req, res) => {
    const { rut } = req.query;

    try {
        const rowCount = await eliminarEstudiante(rut);
        if (rowCount === 0) {
            res.status(404).send('Estudiante no encontrado');
        } else {
            res.send('Estudiante eliminado correctamente');
        }
    } catch (error) {
        console.error("Se produjo un error:", error);
        res.status(500).send('Error eliminando estudiante');
    }
});


export default router