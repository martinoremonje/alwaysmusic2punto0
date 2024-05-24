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
    const { rut } = req.params;

    try {
        const estudiante = await obtenerEstudiantePorRut(rut);
        res.send(estudiante)
        
    } catch (error) {
        console.error("Se produjo un error:", error);
        res.status(500).send('Error obteniendo estudiante');
    }
};

export const editar = async (req, res) => {
    const { nombre, rut, curso, nivel } = req.params;
    
    try {
        await editarEstudiante(nombre, rut, curso, nivel);
        res.send("estudiante actualizado")
    } catch (error) {
        console.error("Se produjo un error:", error);
        res.status(500).send('Error actualizando estudiante');
    }
};

export const eliminar = async (req, res) => {
    const { rut } = req.query;

    try {
        await eliminarEstudiante(rut);
        res.send("estudiante eliminado")
    } catch (error) {
        console.error("Se produjo un error:", error);
        res.status(500).send('Error eliminando estudiante');
    }
}
