import {agregarEstudiante, obtenerEstudiantePorRut, obtenerEstudiantes, editarEstudiante, eliminarEstudiante} from "../models/queries.js";

export const home = (req, res) =>{
    res.send("hello world")
};


export const agregar = async (req, res) => {
    const { nombre, rut, curso, nivel } = req.body;
    try {
        await agregarEstudiante(nombre, rut, curso, nivel);
        res.send("usuario agregado")
    } catch (error) {
        console.error("Se produjo un error:", error);
        res.status(500).send('Error agregando estudiante');
    }
};

export const estudiantes = async (req, res) => {
    try {
        const response = await obtenerEstudiantes();
        res.send(response)
    } catch (error) {
        console.error("Se produjo un error:", error);
        res.status(500).send('Error obteniendo estudiantes');
    }
};

export const estudianteRut = async (req, res) => {
    const { rut } = req.query;

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
};

export const editar = async (req, res) => {
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
};

export const eliminar = async (req, res) => {
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
}
